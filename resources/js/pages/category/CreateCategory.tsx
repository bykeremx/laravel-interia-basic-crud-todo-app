import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label'; // Make sure to use the correct Label component
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/category',
    },
    {
        title: 'Create Category',
        href: '/categories/create',
    },
];

export default function CreateCategory() {
    const { data, setData, processing, errors } = useForm({
        name: '',
        color: '#3b82f6', // Default indigo color
        description: '',
    });
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Submitting category:', data);
        router.post(route("category.store"), data, );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Create a Category</h1>
                    <Button
                        className='text-white bg-indigo-600 hover:bg-indigo-700'
                        onClick={() => window.history.back()}
                    >
                        Go back to category list
                    </Button>
                </div>

                <hr />

                <div className=" rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="name">Name  / Adı</Label>
                                <Input
                                    id="name"
                                    type='text'
                                    className='p-5'
                                    placeholder='Enter category name'
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            {/* Color */}
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="color">Color / Rengi</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="color"
                                        type='color'
                                        className='w-16 h-10 p-1'
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                    />
                                    <Input
                                        type='text'
                                        className='p-5 flex-1'
                                        placeholder='Hex color code'
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                    />
                                </div>
                                {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
                            </div>
                            {/* Description */}
                            <div className='flex flex-col gap-2 md:col-span-2'>
                                <Label htmlFor="description">Description / Açıklaması </Label>
                                <Input type='textarea'
                                    id="description"
                                    className='min-h-[100px]'
                                    placeholder='Enter category description'
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className='text-white bg-indigo-600 hover:bg-indigo-700'
                                disabled={processing}
                            >
                                {processing ? 'Creating...' : 'Create Category'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

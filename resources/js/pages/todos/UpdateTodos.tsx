import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowBigLeftDash } from 'lucide-react';
import { type CategoryProps } from '@/types';
import { useState } from 'react';
import FlashMessages from '@/components/flashMessages';
import { type TodosPagesProps as TodoInterFace } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Update Todos',
        href: '/update-todo',
    },
];
interface TodosPagesProps {
    getCategory: CategoryProps[]
    todo : TodoInterFace
}

export default function UpdateTodos({ getCategory ,todo }: TodosPagesProps) {

    const [values, setValues] = useState({
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        category: todo.category_id ? todo.category_id.toString() : '',
        enddate: todo.enddate ? todo.enddate : '',
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.put(route("todos.update",{id:todo.id}), values)
    };
    const { flash }  = usePage().props
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='space-x-2'>
                    <Link href={route("todos.pages")}>
                        <Button className='bg-green-400 hover:bg-green-500 hover:cursor-pointer'>
                            <ArrowBigLeftDash />
                            Back to todos list
                        </Button>
                    </Link>

                </div>
                <div>
                    <h1 className="text-2xl font-bold mb-4">Create a todo</h1>
                    {flash.success && (
                        <FlashMessages
                            status={"success"}
                            messages={flash.success}
                        />
                    )}
                    {/* <FlashMessages status="success" messages="kerem" /> */}
                    <div className="m-4 max-w-3xl">
                        <form onSubmit={handleSubmit}>
                            <div className='mb-5 space-y-2'>
                                <Label htmlFor="title">Title / Başlık</Label>
                                <Input
                                    id="title"
                                    type='text'
                                    placeholder='Please enter todo title'
                                    value={values.title}
                                    onChange={(e) => setValues({ ...values, title: e.target.value })}
                                />
                            </div>

                            <div className='mb-5 space-y-2'>
                                <Label htmlFor="description">Description / Açıklama</Label>
                                <Input
                                    id="description"
                                    type='text'
                                    placeholder='Please enter todo description'
                                    value={values.description}
                                    onChange={(e) => setValues({ ...values, description: e.target.value })}
                                />
                            </div>
                            <div className='mb-5  space-y-2'>
                                <Label htmlFor="priority">Priority / Öncelik</Label>
                                <Select name="priority" value={values.priority} onValueChange={(selectedValue) => setValues({ ...values, priority: selectedValue })}>
                                    <SelectTrigger className="w-[500px]">
                                        <SelectValue placeholder="Select priority / Öncelik Seç" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low" ><span className='text-orange-300'>Low / Düşük</span></SelectItem>
                                        <SelectItem value="medium"><span className='text-orange-500'>Medium / Orta</span></SelectItem>
                                        <SelectItem value="high"><span className='text-orange-700'>High / Yüksek</span></SelectItem>
                                    </SelectContent>
                                </Select>
                                <small className='text-gray-500'>
                                    Example: low, medium, high / Örn: düşük, orta, yüksek
                                </small>
                            </div>
                            {/* Bitiş Tarihi  */}
                            <div className='mb-5 space-y-2'>
                                <Label htmlFor="description">End date / Bitiş tarihi</Label>
                                <Input
                                    id="enddate"
                                    type='date'
                                    placeholder='Please enter todo end date'
                                    value={values.enddate}
                                    onChange={(e) => setValues({ ...values, enddate: e.target.value })}
                                />
                            </div>

                            <div className='mb-5 space-y-2'>
                                <Label htmlFor="status">Categories</Label>
                                <Select name="categories" value={values.category} onValueChange={(selectedValue) => setValues({ ...values, category: selectedValue })}>
                                    <SelectTrigger className="w-[500px]">
                                        <SelectValue placeholder="Select category / Kategori seç" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            getCategory.map((category) => (
                                                <SelectItem key={category.slug} value={category.id.toString()}>
                                                    <span style={{ color: category.color }}>{category.name}</span>
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type='submit' className="mt-4 text-white bg-blue-500 hover:bg-blue-600">
                                Update Todo
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

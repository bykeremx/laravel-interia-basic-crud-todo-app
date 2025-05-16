import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { type Todo } from '@/types';
import { Trash, PencilLine, Flag, Archive, CheckCircle, Clock, Move, ArchiveIcon, Plus, Book } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import FlashMessages from '@/components/flashMessages';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Archive Todos',
        href: '/todos',
    },
];

interface TodosPagesProps {
    todos: Todo[]
}

export default function ArchiveTodos({ todos }: TodosPagesProps) {
    const { flash } = usePage().props;
    const statusClasses = {
        pending: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200',
        in_progress: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
        completed: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200',
        archived: 'border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-800/20 dark:text-slate-200',
    };

    const priorityClasses = {
        low: 'text-green-600',
        medium: 'text-yellow-600',
        high: 'text-red-600',
    };

    const statusIcons = {
        pending: <Clock className="h-4 w-4" />,
        in_progress: <Move className="h-4 w-4" />,
        completed: <CheckCircle className="h-4 w-4" />,
        archived: <Archive className="h-4 w-4" />,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="">
                    <h1 className="flex items-center text-2xl font-bold mb-4 gap-3">
                        <Book></Book>

                        Archive Todo List
                    </h1>
                    <hr />
                    <br />
                    <div className="flex gap-2">
                        <Link href={route("create.todo.page")}>
                            <Button className=" text-white bg-indigo-600 hover:bg-indigo-700">
                                <Plus></Plus>
                                Create a to do
                            </Button>
                        </Link>
                        <Link href={route("create.todo.page")}>
                            <Button className=" text-white bg-indigo-600 hover:bg-indigo-700">
                                <ArchiveIcon></ArchiveIcon>
                                Archive Todos List
                            </Button>
                        </Link>
                    </div>
                </div>
                {flash.success && (
                    <FlashMessages status={"success"} messages={flash.success}></FlashMessages>
                )}
                {flash.error && (
                    <FlashMessages status={"error"} messages={flash.error}></FlashMessages>
                )}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {todos.map((todo) => (
                        <Card
                            key={todo.id}
                            className={`${statusClasses[todo.status]} shadow-sm hover:shadow-md transition-shadow`}
                        >
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm font-medium px-2 py-1 rounded-md bg-white">
                                        {todo.category?.name || 'No Category'}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Flag className={`h-4 w-4 ${priorityClasses[todo.priority]}`} />
                                        <span className="text-xs capitalize">{todo.priority}</span>
                                    </div>
                                </div>

                                <CardTitle className="text-lg">
                                    {todo.title}
                                    <div className="flex items-center gap-2 mt-2">
                                        {statusIcons[todo.status]}
                                        <span className="text-sm capitalize">
                                            {todo.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="py-2">
                                <CardDescription className="text-gray-600 line-clamp-3">
                                    {todo.description}
                                </CardDescription>
                                {todo.due_date && (
                                    <div className="mt-2 text-xs text-gray-500">
                                        Due: {new Date(todo.due_date).toLocaleDateString()}
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter className="flex flex-wrap gap-2 pt-3 border-t">
                                <Button
                                    variant={todo.status === 'pending' ? 'default' : 'outline'}
                                    size="sm"
                                    className="text-xs gap-1"
                                >
                                    <Clock className="h-3 w-3" />
                                    Pending
                                </Button>
                                <Button
                                    variant={todo.status === 'in_progress' ? 'default' : 'outline'}
                                    size="sm"
                                    className="text-xs gap-1"
                                >
                                    <Move className="h-3 w-3" />
                                    Progress
                                </Button>
                                <Link href={route("todos.complete", todo.id)}>
                                    <Button
                                        variant={todo.status === 'completed' ? 'default' : 'outline'}
                                        size="sm"
                                        className="text-xs gap-1"
                                    >
                                        <CheckCircle className="h-3 w-3" />
                                        Complete
                                    </Button>
                                </Link>
                                <Link href={route("todos.remove.archive", todo.id)}>
                                    <Button
                                        variant={todo.status === 'archived' ? 'default' : 'outline'}
                                        size="sm"
                                        className="text-xs gap-1"
                                    >
                                        <Archive className="h-3 w-3" />
                                        Remove Archive
                                    </Button></Link>
                                <div className="w-full flex gap-2 mt-2">
                                    <Link href={route("todos.edit", todo.id)}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 gap-1"
                                        >
                                            <PencilLine className="h-3 w-3" />
                                            Edit
                                        </Button>
                                    </Link>
                                    <Link href={route("todos.delete", todo.id)}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 gap-1 text-red-600 hover:text-red-700"
                                        >
                                            <Trash className="h-3 w-3" />
                                            Delete
                                        </Button>
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

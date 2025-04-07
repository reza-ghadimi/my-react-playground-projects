export default function Sidebar({ projectsList, handleClick }) {
    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <a href="https://github.com/reza-ghadimi/my-react-playground/tree/main" className="flex items-center ps-2.5 mb-5">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Project Management</span>
                </a>

                <hr />

                <ul className="space-y-2 font-medium">
                    <li>
                        <a onClick={() => handleClick({ id: null })} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3">+ New Project</span>
                        </a>
                    </li>

                    <hr />

                    {projectsList?.map(current => (
                        <li key={current.id}>
                            <a onClick={() => handleClick({ id: current.id })} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                                <span className="ms-3">{current.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
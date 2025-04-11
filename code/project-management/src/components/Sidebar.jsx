export default function Sidebar({ projects, selectedId, handleClick }) {
    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <a
                    href="https://github.com/reza-ghadimi/my-react-playground/tree/main"
                    className="flex items-center ps-2.5 mb-5"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Project Management
                    </span>
                </a>

                <hr className="my-3 border-gray-300 dark:border-gray-600" />

                <button
                    onClick={handleClick}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                >
                    <span className="ms-3">+ New Project</span>
                </button>

                <ul className="space-y-2 font-medium mt-4">
                    {projects?.map((project) => (
                        <li key={project.id}>
                            <button
                                onClick={() => handleClick({ id: project.id })}
                                className={`w-full text-left flex items-center p-2 rounded-lg group ${selectedId === project.id
                                    ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <span className="ms-3">{project.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

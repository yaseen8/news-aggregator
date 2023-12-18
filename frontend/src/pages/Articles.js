import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { apiURL } from "../constants/config";
import useDebounce from "../hooks/useDebounce";

export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [paginationUrl, setPaginationUrl] = useState({next_page_url: '', prev_page_url: ''});
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPreference, setSelectedPreference] = useState('');
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectedSource = (value) => {
        const url = `${apiURL}/articles?source=${value}`
        loadArticles(url);
        setIsOpen(false);
    }

    const [search, setSearch] = useState('');
    useEffect(() => {
        loadArticles()
    }, []);
    
    useDebounce(() => {
        const url = `${apiURL}/articles?search=${search}`;
        loadArticles(url);
    }, [search], 800);

    const loadArticles = (url = `${apiURL}/articles`) => {
        fetch(url,
        {
        method:'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        }).then(response=>response.json())
        .then(response => {
            setArticles(response.data);
            setPaginationUrl(paginationUrl => ({
                ...paginationUrl,
                next_page_url: response.next_page_url,
                prev_page_url: response.prev_page_url
            }))
        })
        .catch(error=> {
            if (error.status.includes('Token')) {
                navigate('/');
            }
        })
    }

    const handlePrevious = () => {
        loadArticles(paginationUrl.prev_page_url);
    }

    const handleNext = () => {
        loadArticles(paginationUrl.next_page_url);
    }

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const  toggleModal = () => {
        document.getElementById('modal').classList.toggle('hidden')
    }

    const handlePreference = () => {
        fetch(`${apiURL}/preference`,
        {
        method:'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({source: selectedPreference})
        }).then(response=>response.json())
        .then(response => {
            toggleModal();
        })
        .catch(error=>console.log(error))
    }
    return (
        <>
        <div className="flex mt-3">
            <div className="flex justify-center w-full">
            <div className='py-6 pb-8 ml-3'>
            <div className="relative inline-block">
                <button
                    type="button"
                    className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                    onClick={toggleDropdown}
                >
                    Source <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <a
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => selectedSource('newsapi')}
                                >
                                    News API
                                </a>
                            </li>
                            <li>
                                <a
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => selectedSource('guardianapi')}
                                >
                                    Guardian
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
            <div className="mb-3 w-48 md:w-96 mt-6 ml-4">
                <div className="relative mb-4 flex w-full flex-wrap">
                    <input
                        onChange={handleChange}
                        type="search"
                        value={search || ''}
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon1" />
                </div>
            </div>
            </div>
            <div>
            <div className="flex items-center justify-end mr-8">
            <button className="py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={toggleModal}>Preference</button>
            </div>
            <div className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal">
            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="relative inline-block w-2/4">
                <button
                    type="button"
                    className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                    onClick={toggleDropdown}
                >
                    Source <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <a
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        setSelectedPreference('newsapi')
                                        setIsOpen(false)
                                    }
                                    }
                                >
                                    News API
                                </a>
                            </li>
                            <li>
                                <a
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        setSelectedPreference('guardianapi')
                                        setIsOpen(false)
                                    }}
                                >
                                    Guardian
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
                </div>
                <div className="bg-gray-200 px-4 py-3 text-right">
                    <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={toggleModal}><i className="fas fa-times"></i> Cancel</button>
                    <button type="button" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2" onClick={handlePreference}><i className="fas fa-plus"></i>Save</button>
                </div>
                </div>
            </div>
        </div>
            </div>
        </div>
        <div className="flex justify-end mr-4">
            <button className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                onClick={handlePrevious} disabled={!paginationUrl.prev_page_url}>
                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="2" strokeLinejoin="round" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                </svg>
                Previous
            </button>
            <button  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            onClick={handleNext} disabled={!paginationUrl.next_page_url}>
                Next
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
        </div>
        <div className="m-4 flex flex-wrap">
            {
                articles && articles.map(item => (
                    <div className="max-w-sm rounded overflow-hidden shadow-lg mr-3 mt-3" key={item.id}>
                        <img className="w-full" src={item.urlToImage} />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{item.title}</div>
                            <p className="text-gray-700 text-base">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
        </>
    )
}
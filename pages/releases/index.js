import Header from '../../components/Root/Header';
import TitleHeader from '../../components/Root/TitleHeader';
import Footer from '../../components/Root/Footer';
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, connectHits, connectSearchBox, connectPagination } from "react-instantsearch-dom";
import { SearchIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
  );


export default function CompaniesIndex() {
    return (
        <div>
            <Header />
            <TitleHeader title="Releases" />
            <div className = 'pl-2 pr-2 pt-4 sm:pl-6 sm:pr-6'>
                <p className = "text-lg font-medium my-4 text-gray-800">Latest company press releases</p>
                <InstantSearch 
                    searchClient={searchClient} 
                    indexName="releases">
                    <CustomSearchBox />
                    <div className="m-4"></div>
                    <CustomHits />
                </InstantSearch>
            </div>
            <Footer />
        </div>
    )
}


export function SearchBox({ currentRefinement, isSearchStalled, refine }) {
  return (
    <form noValidate action="" role="search" className = 'w-full mr-2'>
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
                type="search"
                value={currentRefinement}
                onChange={event => refine(event.currentTarget.value)}
                placeholder = "Search for a company, title, or description of a press release."
                className = "block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            </div>
        {isSearchStalled ? 'Loading...' : ''}
    </form>
  );
}

const CustomSearchBox = connectSearchBox(SearchBox);

const Hits = ({ hits }) => (
    <div className="grid grid-cols-1">
        {hits.map((hit) => (
            <div
                key={hit.ticker}
                className="mb-4 justify-between relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
                <div className = 'flex items-center'>
                    <div className="flex-1 min-w-0 ml-4">
                        <div href="#" className="focus:outline-none">
                            <p className="text-sm font-medium text-gray-900 flex">{hit.title}
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {hit.subject}
                                </span>
                            </p>
                            <p className="text-sm text-gray-500 w-3/4">{hit.pubDate} | {hit.contributor}</p>
                        </div>
                        <div className="text-sm text-gray-500 w-2/3" dangerouslySetInnerHTML={{ __html: hit.description }} />
                    </div>
                </div>
                <a 
                    href = {hit.link} 
                    rel="noreferrer"
                    target="_blank"
                    className="flex-shrink-0 cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Read More &rarr;
                </a>
            </div>
        ))}
        </div>
);

const CustomHits = connectHits(Hits);
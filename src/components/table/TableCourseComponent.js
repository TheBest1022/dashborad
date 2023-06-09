import { useState } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";

const TableCourseComponent = ({ section, tag, title, data, pageSize = 5 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(data.length / pageSize);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
  };

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-sm xl:text-sm"
                >
                  #
                </th>
                {title.map(({ name }) => (
                  <th
                    key={name}
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-sm xl:text-sm"
                  >
                    {name}
                  </th>
                ))}
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-sm xl:text-sm"
                >
                  OPCIONES
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData?.map((datas, index) => {
                const globalIndex = currentPage * pageSize + index + 1;
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 text-xs text-center text-[#34495E] whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-xs">
                      {globalIndex}
                    </td>
                    {title?.map((item) => {
                      const value = datas[item.id];
                      return (
                        <td
                          key={item.id}
                          className="px-6 py-4 text-xs text-[#34495E] whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-xs"
                        >
                          {value}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 text-xs text-center text-[#34495E] whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-xs">
                      <Link
                        href={`/dashboard/docente/tema/${datas.Id}`}
                        className="text-green-500 hover:text-green-700"
                      >
                        Ver curso
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          disabledClassName={"disabled"}
        />
      </div>
    </div>
  );
};

export default TableCourseComponent;

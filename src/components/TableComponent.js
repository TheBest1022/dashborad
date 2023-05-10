import { useState } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";

const TableComponent = ({ section, tag, title, data, pageSize = 5 }) => {
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
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-sm xl:text-sm"
                >
                  Edit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-sm xl:text-sm"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData?.map((datas) => {
                return (
                  <tr key={datas.id}>
                    {title?.map((item) => {
                      const value = datas[item.id];
                      return (
                        <td
                          key={item.id}
                          className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-base"
                        >
                          {value}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-base">
                      <Link
                        className="text-green-500 hover:text-green-700"
                        href={`/dashboard/${section}/edit/${datas.id}`}
                      >
                        Editar
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap sm:px-2 md:px-3 lg:px-4 xl:px-6 sm:text-sm md:text-base lg:text-base xl:text-base">
                      <Link
                        className="text-red-500 hover:text-red-700"
                        href="#"
                        onClick={() => handleDelete(datas.id)}
                      >
                        Eliminar
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

export default TableComponent;

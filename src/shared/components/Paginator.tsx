import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const getPageItems = (currentPage: number, totalPages: number): (number | "ellipsis")[] => {
    const siblingCount = 1
    const totalItems = siblingCount * 2 + 5

    if (totalPages <= totalItems) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1)
    const rightSibling = Math.min(currentPage + siblingCount, totalPages)

    const showLeftEllipsis = leftSibling > 2
    const showRightEllipsis = rightSibling < totalPages - 1

    const items: (number | "ellipsis")[] = [1]

    if (showLeftEllipsis) items.push("ellipsis")

    for (let page = Math.max(leftSibling, 2); page <= Math.min(rightSibling, totalPages - 1); page++) {
        items.push(page)
    }

    if (showRightEllipsis) items.push("ellipsis")

    items.push(totalPages)

    return items
}

const Paginator = ({
                               currentPage,
                               totalPages,
                               onPageChange,
                           }: PaginationProps) => {
    if (totalPages <= 1) return null

    const pageItems = getPageItems(currentPage, totalPages)

    return (
        <div className="flex items-center justify-center gap-1 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
                className="flex items-center justify-center w-8 h-8 text-xs text-gray-500 border border-gray-300 rounded-md transition-colors hover:bg-gray-100 hover:text-black disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:hover:text-gray-500"
            >
                <FaChevronLeft />
            </button>

            {pageItems.map((item, index) =>
                item === "ellipsis" ? (
                    <span
                        key={`ellipsis-${index}`}
                        className="flex items-center justify-center w-8 h-8 text-sm text-gray-400"
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={item}
                        onClick={() => onPageChange(item)}
                        aria-current={item === currentPage ? "page" : undefined}
                        className={`flex items-center justify-center w-8 h-8 text-sm rounded-md border transition-colors cursor-pointer ${
                            item === currentPage
                                ? "bg-black text-white border-black"
                                : "text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-black"
                        }`}
                    >
                        {item}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Página siguiente"
                className="flex items-center justify-center w-8 h-8 text-xs text-gray-500 border border-gray-300 rounded-md transition-colors hover:bg-gray-100 hover:text-black disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-500 cursor-pointer disabled:cursor-not-allowed"
            >
                <FaChevronRight />
            </button>
        </div>
    )
}

export default Paginator;

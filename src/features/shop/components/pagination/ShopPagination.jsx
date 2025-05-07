import { useCallback } from "react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

function ShopPagination({
  onPageChange,
  totalPages,
  currentPage,
  itemsPerPage,
  isLoading,
}) {
  const goToNextPage = useCallback(() => {
    const nextPage = Math.min(totalPages, currentPage + 1);
    onPageChange(nextPage);
  }, [currentPage, totalPages, onPageChange]);

  const goToPrevPage = useCallback(() => {
    const prevPage = Math.min(totalPages, currentPage - 1);
    onPageChange(prevPage);
  }, [totalPages, currentPage, onPageChange]);

  const disabledButton = isLoading;

  return (
    <div className="flex justify-center gap-4 mt-2 items-center">
      <span className="border h-0 w-full border-[#917663]"></span>
      <button
        onClick={goToPrevPage}
        className="border-2 rounded-full px-2 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30 hover:opacity-80"
        disabled={currentPage === 1 || disabledButton}
        aria-label="Previous Page"
      >
        <RxCaretLeft size={25} className="-left-1 -bottom-1.5 absolute" />
      </button>
      <p className="text-md text-[#43342D]">{currentPage}</p>
      <button
        onClick={goToNextPage}
        className="border-2 rounded-full px-2 size-5 text-yellow-400 border-[#646179] bg-[#2c2b35] relative cursor-pointer disabled:opacity-30 hover:opacity-80"
        disabled={currentPage === totalPages || disabledButton}
        aria-label="Next Page"
      >
        <RxCaretRight size={25} className="-left-1 -bottom-1.5 absolute" />
      </button>
      <span className="border h-0 w-full border-[#917663]"></span>
    </div>
  );
}

export default ShopPagination;

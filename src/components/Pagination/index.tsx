import { FC } from "react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (c: number) => void;
}

interface paginationButtonProps {
    value: string;
    setPage: number;
    condition: boolean;
}

const Pagination: FC<PaginationProps> = ({
    totalPages,
    currentPage,
    setCurrentPage,
}) => {
    const paginationButton = ({
        value,
        setPage,
        condition,
    }: paginationButtonProps) => {
        return (
            <>
                {condition && (
                    <button onClick={() => setCurrentPage(setPage)}>
                        {value}
                    </button>
                )}
            </>
        );
    };

    if (totalPages === 1) {
        return <></>;
    }

    return (
        <div>
            {paginationButton({
                value: "<",
                setPage: currentPage - 1,
                condition: currentPage > 1,
            })}

            {paginationButton({
                value: "1",
                setPage: 1,
                condition: currentPage > 1,
            })}

            {paginationButton({
                value: currentPage === 3 ? "2" : "...",
                setPage: currentPage === 3 ? 2 : currentPage,
                condition: currentPage > 2,
            })}

            <button style={{ fontWeight: 700 }}>{currentPage}</button>

            {paginationButton({
                value:
                    currentPage === totalPages - 2
                        ? (totalPages - 1).toString()
                        : "...",
                setPage:
                    currentPage === totalPages - 2
                        ? totalPages - 1
                        : currentPage,
                condition: currentPage < totalPages - 1,
            })}

            {paginationButton({
                value: totalPages.toString(),
                setPage: totalPages,
                condition: currentPage < totalPages,
            })}

            {paginationButton({
                value: ">",
                setPage: currentPage + 1,
                condition: currentPage < totalPages,
            })}
        </div>
    );
};

export default Pagination;

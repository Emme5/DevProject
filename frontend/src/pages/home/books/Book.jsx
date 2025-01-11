import React, { useState } from "react";
import { useFetchAllBooksQuery } from "../../../redux/features/books/booksApi";
import { getImgUrl } from "../../../utils/getImgUrl";
import ModalBookDetail from "./ModalBookDetail";

function Book() {
	const { data: books = [] } = useFetchAllBooksQuery();

    const [selectedBookId, setSelectedBookId] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);


    const handleViewDetail = (id) => {
        setSelectedBookId(id);
		setIsModalOpen(true);
    }

    const closeModal = () => {
		setSelectedBookId(null);
		setIsModalOpen(false);
	};


	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
			{books.map((book) => (
				<div
					key={book._id}
					className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300"
				>
					<div className="aspect-w-16 aspect-h-9 rounded-md mb-4">
						<img
							src={getImgUrl(book.coverImage)}
							alt={book.title}
							className="w-full h-full object-cover rounded-md"
						/>
					</div>
					<h3 className="text-lg font-semibold text-gray-800 mb-2">
						{book.title}
					</h3>
					<p className="text-sm text-gray-600 mb-3 line-clamp-3">
						{book.description}
					</p>
					<p className="text-sm text-gray-700 font-medium mb-1">
						Category: <span className="text-gray-900">{book.category}</span>
					</p>
					<p className="text-sm text-gray-500 line-through mb-1">
						Old Price: ${book.oldPrice}
					</p>
					<p className="text-sm text-green-600 font-bold mb-3">
						New Price: ${book.newPrice}
					</p>
					<p className="text-sm text-gray-800">
						Trending:{" "}
						<span
							className={`font-medium ${
								book.trending ? "text-green-500" : "text-red-500"
							}`}
						>
							{book.trending ? "Yes" : "No"}
						</span>
					</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 w-full"
                        onClick={()=>{
                            handleViewDetail(book._id)
                        }}
                    >
                        ดูรายละเอียด
                    </button>
				</div>
			))}
            {isModalOpen && (
				<ModalBookDetail bookId={selectedBookId} onClose={closeModal} />
			)}
		</div>
	);
}

export default Book;

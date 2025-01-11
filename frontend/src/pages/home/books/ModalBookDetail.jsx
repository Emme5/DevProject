import React, { useEffect, useState } from "react";
import { useFetchBookByIdQuery } from "../../../redux/features/books/booksApi";
import { getImgUrl } from "../../../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice";

function ModalBookDetail({ bookId, onClose }) {
	const dispatch = useDispatch();

	const { data: bookDetail, isLoading } = useFetchBookByIdQuery(bookId);

	function handleAddToCart(id) {
		dispatch(addToCart(id));
	}

	if (!bookId) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
				{/* Loading state */}
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<div>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-bold text-gray-800">
								{bookDetail?.title}
							</h2>
							<button
								className=" hover:text-gray-700 text-2xl"
								onClick={onClose}
							>
								&times;
							</button>
						</div>
						<div className="aspect-w-16 aspect-h-9 rounded-md mb-4">
							<img
								src={getImgUrl(bookDetail.coverImage)}
								alt={bookDetail.title}
								className="w-full h-full object-cover rounded-md"
							/>
						</div>
						<p className="text-gray-600 mb-4">{bookDetail?.description}</p>
						<p className="text-sm text-gray-700 mb-1">
							Category:{" "}
							<span className="text-gray-900">{bookDetail?.category}</span>
						</p>
						<p className="text-sm text-gray-500 line-through mb-1">
							Old Price: ${bookDetail?.oldPrice}
						</p>
						<p className="text-sm text-green-600 font-bold mb-3">
							New Price: ${bookDetail?.newPrice}
						</p>
						<p className="text-sm text-gray-800">
							Trending:{" "}
							<span
								className={`font-medium ${
									bookDetail?.trending ? "text-green-500" : "text-red-500"
								}`}
							>
								{bookDetail?.trending ? "Yes" : "No"}
							</span>
						</p>
						<button
							className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
							onClick={() => {
								handleAddToCart(bookDetail);
							}}
						>
							Add to Cart
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ModalBookDetail;

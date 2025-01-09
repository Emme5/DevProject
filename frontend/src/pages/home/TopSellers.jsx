import React, { useEffect, useState } from 'react';
import BookCard from './books/BookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ["ทุกประเภท", "ธุรกิจ", "นิยาย", "สยองขวัญ", "ผจญภัย", "การตลาด"];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("ทุกประเภท");

  const { data: books = [] } = useFetchAllBooksQuery();

  const filteredBooks = selectedCategory === "ทุกประเภท" ? books : books.filter(book =>
    book.category === selectedCategory.toLowerCase());

  return (
    <div className='py-10'>
      <h2 className='text-4xl font-semibold mb-5'>
        สินค้าขายดี
      </h2>

      {/* category filtering */}
      <div className='mb-8 flex items-center'>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name='category' id='category' className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
          {
            categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))
          }
        </select>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 3000, // ตั้งค่าให้สไลด์ทุกๆ 3 วินาที
          disableOnInteraction: false, // ให้ autoplay ทำงานต่อหลังจากมีการเลื่อนด้วยตนเอง
        }}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          }
        }}
        modules={[Pagination, Navigation, Autoplay]} // เพิ่ม Autoplay
        className="mySwiper"
      >
        {
          filteredBooks.length > 0 && filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}

export default TopSellers;

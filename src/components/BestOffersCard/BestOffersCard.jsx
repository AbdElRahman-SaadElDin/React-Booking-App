export default function BestOffersCard({
  city = "Alexandria",
  description = "Best Hotel, villa",
  image,
}) {
  return (
    <div className="w-full max-w-[300px] h-[80px] rounded-[180px] bg-[#7C829B0D] border border-[#ECEDF5] flex items-center gap-3 px-4">
      <img
        src={image}
        alt={city}
        className="w-[50px] h-[50px] rounded-full object-cover flex-shrink-0"
        loading="lazy"
      />
      <div className="flex flex-col min-w-0 flex-1">
        <h3 className="text-[#282E44] font-medium text-base sm:text-[18px] truncate">
          {city}
        </h3>
        <p className="text-[#475073] text-xs sm:text-[14px] truncate">
          {description}
        </p>
      </div>
    </div>
  );
}

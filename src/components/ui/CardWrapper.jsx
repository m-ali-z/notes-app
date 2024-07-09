export default function CardWrapper({ children, title }) {
  return (
    <section className="w-[30rem]  rounded-lg bg-[#f7e1e1] mt-[10rem] mx-auto">
      <div className="p-4 h-full">
        <h1 className="text-center text-2xl mb-10">{title}</h1>
        {children}
      </div>
    </section>
  );
}

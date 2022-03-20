import { useParams } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";

const UserHome = () => {
  const { username } = useParams();
  return (
    <main className="max-w-screen-md mx-auto space-y-2 md:space-y-8">
      <section className="p-4 flex flex-col md:flex-row items-center gap-2 md:gap-6">
        <HiUserCircle className="w-20 h-20 md:w-24 md:h-24 shrink-0" />
        <section className="p-2 text-center md:text-left space-y-2">
          <h2 className="font-bold text-lg md:text-2xl">{username}</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur dicta ea enim labore porro quia suscipit veniam voluptas voluptatum. Eaque?
          </p>
        </section>
      </section>
      <section>
        <article className="divide-y md:divide-y-2 space-y-2 md:space-y-4">
          <article className="p-4 mx-4 space-y-2 md:space-y-4">
            <h2 className="font-bold text-lg md:text-2xl">Title</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Commodi consequuntur in magni obcaecati perspiciatis tempore voluptates! Eaque eveniet exercitationem ipsum?
            </p>
            <div className="text-xs md:text-sm text-gray-500">
              2022년 3월 20일 &middot; 0개의 댓글
            </div>
          </article>
          <article className="p-4 mx-4 space-y-2 md:space-y-4">
            <h2 className="font-bold text-lg md:text-2xl">Title</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Commodi consequuntur in magni obcaecati perspiciatis tempore voluptates! Eaque eveniet exercitationem ipsum?
            </p>
            <div className="text-xs md:text-sm text-gray-500">
              2022년 3월 20일 &middot; 0개의 댓글
            </div>
          </article>
        </article>
      </section>
    </main>
  );
};

export default UserHome;

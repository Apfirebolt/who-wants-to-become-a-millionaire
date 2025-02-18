import { useSelector } from "react-redux";
import moneyImage from "../assets/money.jpeg";

const Home = () => {
  const features = [
    {
      name: "Quiz",
      description:
        "Create quizes, answer quizes posted by others and earn rewards.",
    },
    {
      name: "Questions",
      description: "Post your questions and answer questions posted by others.",
    },
  ];

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white container mx-auto my-3">
      <section aria-labelledby="features-heading" className="relative">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:pb-32 sm:px-6 lg:max-w-7xl lg:pt-32 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src={moneyImage}
              alt=""
            />
          </div>
          <div>
            <h2 id="features-heading" className="font-medium text-gray-500">
              {user ? `Welcome, ${user.email}` : "Please Login"}
            </h2>
            <p className="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight">
              Welcome to WWTBAMM
            </p>

            <p className="mt-4 text-gray-500">
              Who wants to become a millionaire
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-y-10 gap-x-8 text-sm sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.name}>
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

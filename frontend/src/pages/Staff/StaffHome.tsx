import { Link } from 'react-router-dom'

const cards = [
    {
        title: "View Customers",
        description: "View all",
        image: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
        link: "/staff/customers"
    },
    {
        title: "View Transactions",
        description: "View all",
        image: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
        link: "/staff/transactions"
    }
]

const StaffHome = () => {
  return (
    <div className="bg-indigo-500 homepage_container pt-12 px-16">
        <h1 className="text-4xl font-bold text-center mb-3">Staff Menu</h1>

<div className="flex flex-col flex-1 items-center flex-wrap">
            {cards.map((card, index) => (
              <div key={index} className="p-4 card-container rounded-lg shadow-lg m-2">
                <Link to={card.link}>
                  <a
                    href="#"
                    className="flex flex-col items-center rounded-lg md:flex-row"
                  >
                    <img
                      className="object-cover w-full rounded-t-lg h-46 md:h-auto md:w-24 md:rounded-none md:rounded-s-lg"
                      src={card.image}
                      alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                        {card.title}
                      </h5>
                      <p className="mb-3 font-normal text-gray-200">
                        {card.description}
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
    </div>
  )
}

export default StaffHome
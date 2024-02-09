import React, { useContext } from "react";
import Navbar from "../components/Navbar/Index";
import OrderTable from "./OrderTable";
//import  useOutletContextWrapper  from "./useOutletContextWrapper";
//import { useOutletContext } from 'react-router-dom';


const OutletContext = React.createContext()
export const useOutletContext = () => useContext(OutletContext)

export const OutletConsumer = ({ children }) => {
    const outler = useOutletContext();
    return children(outler);
};

class GetOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      orders: [],

      input: null,
      response_get: null
    };
    this.getOrder = this.getOrder.bind(this);
  }



  async componentDidMount() {

    try {
      const response = await fetch("/orders?limit=769786", {
        method: "GET",
        params: {
          limit: 5,
        },
      });
      const data = await response.json();
      this.setState({
        response: JSON.stringify(data),
        orders: data.orders,
      });
      console.log(this.state.response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  updateInputValue(evt) {
     const val = evt.target.value;
     this.setState({
         input: val
     })
  }

  async getOrder() {
      // Simple GET request using fetch
      console.log("hihello")

     //const data = '{"couriers": []}'
     console.log(this.state.input_id)

     try {
       const response = await fetch(`/orders/${this.state.input}`, {
       method: "GET",
     })
     const to_print = await response.json();

     this.setState({ response_get: JSON.stringify(to_print)})
    }
  catch {
    this.setState({ response_get: "not found"})
  }

 }

  render() {
    const dataHeader = [
      {
        key: "name",
        label: "ID",
      },
      {
        key: "email",
        label: "WEIGHT",
      },
      {
        key: "username",
        label: "REGION",
      },
      {
        key: "role",
        label: "DELIVERY HOURS",
      },
      {
        key: "qwe",
        label: "COST",
      },
      {
        key: "teq",
        label: "COMPLETED TIME",
      }
    ];
    console.log(this.state.couriers)
    //const [sidebarToggle] = useOutletContext();
    //const [sidebarToggle] = useOutletContextWrapper();
    return (
      <>
        <Navbar toggle={OutletConsumer} />
        <main className="h-full">


          {/* Main Content */}

          <div className="card text-left m-3">
          <div className="mainCard">
            <div className="card-body">

            <label htmlFor="defaultInput" className="text-sm text-gray-600">
              Найти заказ
            </label>
            <input
              id="defaultInput"
              type="text"
              name="defaultInput"
              // onChange={(e) => setEmail(e.target.value)}
              className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
              placeholder="courier-id"
              onChange={evt => this.updateInputValue(evt)}
            />
            <button className="text-emerald-600 border border-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm" onClick={this.getOrder}>
              Поиск
            </button>
            <div>

            Найденный заказ: {this.state.response_get}

            </div>



            <OrderTable
              dataHeader={dataHeader}
              data={this.state.orders}
            />

            </div>
          </div>

          </div>

        </main>
      </>
    );
  }
}

export { GetOrders };

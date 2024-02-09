import React, { useContext } from "react";
import Navbar from "../components/Navbar/Index";
import UserTable from "./UserTable";
//import  useOutletContextWrapper  from "./useOutletContextWrapper";
//import { useOutletContext } from 'react-router-dom';


const OutletContext = React.createContext()
export const useOutletContext = () => useContext(OutletContext)

export const OutletConsumer = ({ children }) => {
    const outler = useOutletContext();
    return children(outler);
};

class GetAllCouriers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      couriers: [],

      input: null,
      response_get: null
    };
    this.getCourier = this.getCourier.bind(this);
  }



  async componentDidMount() {
    console.log("hihello")
    try {
      const response = await fetch("/couriers?limit=769786", {
        method: "GET",
        params: {
          limit: 5,
        },
      });
      const data = await response.json();
      this.setState({
        response: JSON.stringify(data),
        couriers: data.couriers,
      });
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

  async getCourier() {
      // Simple GET request using fetch
      console.log("hihello")

     //const data = '{"couriers": []}'
     console.log(this.state.input_id)

     try {
       const response = await fetch(`/couriers/${this.state.input}`, {
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
        label: "TYPE",
      },
      {
        key: "username",
        label: "Working hours",
      },
      {
        key: "role",
        label: "Regions",
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
              Найти курьера
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
            <button className="text-emerald-600 border border-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm" onClick={this.getCourier}>
              Поиск
            </button>
            <div>

            Найденный курьер: {this.state.response_get}

            </div>



            <UserTable
              dataHeader={dataHeader}
              data={this.state.couriers}
            />

            </div>
          </div>

          </div>

        </main>
      </>
    );
  }
}

export { GetAllCouriers };

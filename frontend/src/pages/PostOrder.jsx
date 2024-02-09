import React, { useContext } from "react";
import Navbar from "../components/Navbar/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTag, faMapMarker, faClock, faDollar } from "@fortawesome/free-solid-svg-icons";
//import  useOutletContextWrapper  from "./useOutletContextWrapper";
//import { useOutletContext } from 'react-router-dom';


const OutletContext = React.createContext()
export const useOutletContext = () => useContext(OutletContext)

export const OutletConsumer = ({ children }) => {
    const outler = useOutletContext();
    return children(outler);
};

class PostOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      id: null,
      weight: null,
      regions: null,
      time: null,
      price: null,

    };
    this.postOrd = this.postOrd.bind(this);
  }

  async postOrd() {



  var data = `{"orders": [{"order_id": ${this.state.id}, "weight": ${this.state.weight}, "regions": ${ this.state.regions}, "delivery_hours": ["${this.state.time}"], "cost": ${ this.state.price}}]}`

  console.log(data)

  this.state.weight = null
  this.state.regions = null
  this.state.price = null
  this.state.time = null

   const response = await fetch('/orders', {
   method: "POST",
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },
   body: data
 })
console.log(response)
try {
 this.setState({ response: "Успех!"})
}
catch {
  this.setState({ response: "Что-то пошло не так, обратитесь к ответственному лицу"})
}

}



  updateID(evt) {
     const val = evt.target.value;
     this.setState({
         id: val
     })
  }
  updateW(evt) {
     const val = evt.target.value;
     this.setState({
         weight: val
     })
  }
  updateR(evt) {
     const val = evt.target.value;
     this.setState({
         regions: val.split(',')
     })
  }
  updateT(evt) {
     const val = evt.target.value;
     this.setState({
         time: val.split(',')
     })
  }
  updateP(evt) {
     const val = evt.target.value;
     this.setState({
         price: val.split(',')
     })
  }



  render() {

    return (
      <>

          <Navbar toggle={OutletConsumer} />
           <main className="h-full">
          {/* Main Content */}
          <div className="mainCard">
            <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">

            <div className="mt-6 relative">
              <label
                htmlFor="inputWithIcon"
                className="text-sm text-gray-600"
              >
                Order ID
              </label>

              <div className="inline-flex items-center justify-center absolute left-0 top-[0.85rem] h-full w-10 text-gray-400">
                <FontAwesomeIcon icon={faCog} />
              </div>
              <input
                id="inputWithIcon"
                type="text"
                name="inputWithIcon"
                onChange={evt => this.updateID(evt)}
                className="text-sm placeholder-gray-500 pl-10 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                placeholder="X"
              />
            </div>


                <div className="mt-6 relative">
                  <label
                    htmlFor="inputWithIcon"
                    className="text-sm text-gray-600"
                  >
                    Weight
                  </label>

                  <div className="inline-flex items-center justify-center absolute left-0 top-[0.85rem] h-full w-10 text-gray-400">
                    <FontAwesomeIcon icon={faTag} />
                  </div>
                  <input
                    id="inputWithIcon"
                    type="text"
                    name="inputWithIcon"
                    onChange={evt => this.updateW(evt)}
                    className="text-sm placeholder-gray-500 pl-10 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="X"
                  />
                </div>




                <div className="mt-6 relative">
                  <label
                    htmlFor="inputWithIcon"
                    className="text-sm text-gray-600"
                  >
                    Region
                  </label>

                  <div className="inline-flex items-center justify-center absolute left-0 top-[0.85rem] h-full w-10 text-gray-400">
                    <FontAwesomeIcon icon={faMapMarker} />
                  </div>
                  <input
                    id="inputWithIcon"
                    type="text"
                    name="inputWithIcon"
                    onChange={evt => this.updateR(evt)}
                    className="text-sm placeholder-gray-500 pl-10 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="x"
                  />
                </div>




                <div className="mt-6 relative">
                  <label
                    htmlFor="inputWithIcon"
                    className="text-sm text-gray-600"
                  >
                    Time
                  </label>

                  <div className="inline-flex items-center justify-center absolute left-0 top-[0.85rem] h-full w-10 text-gray-400">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <input
                    id="inputWithIcon"
                    type="text"
                    name="inputWithIcon"
                    onChange={evt => this.updateT(evt)}
                    className="text-sm placeholder-gray-500 pl-10 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="HH:MM-HH:MM"
                  />
                </div>




                <div className="mt-6 relative">
                  <label
                    htmlFor="inputWithIcon"
                    className="text-sm text-gray-600"
                  >
                    Cost
                  </label>

                  <div className="inline-flex items-center justify-center absolute left-0 top-[0.85rem] h-full w-10 text-gray-400">
                    <FontAwesomeIcon icon={faDollar} />
                  </div>
                  <input
                    id="inputWithIcon"
                    type="text"
                    name="inputWithIcon"
                    onChange={evt => this.updateP(evt)}
                    className="text-sm placeholder-gray-500 pl-10 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="X"
                  />
                </div>

                <div className="mt-6 flex flex-row gap-4">
                  <button className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm" onClick={this.postOrd}>
                    Submit
                  </button>

                </div>
                {this.state.response}
            </div>
          </div>
        </main>
      </>
    );
  }
}

export { PostOrder };

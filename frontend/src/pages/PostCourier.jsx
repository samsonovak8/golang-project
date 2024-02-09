import React, { useContext } from "react";
import Navbar from "../components/Navbar/Index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faClock, faCar, faMapMarker } from "@fortawesome/free-solid-svg-icons";
//import  useOutletContextWrapper  from "./useOutletContextWrapper";
//import { useOutletContext } from 'react-router-dom';


const OutletContext = React.createContext()
export const useOutletContext = () => useContext(OutletContext)

export const OutletConsumer = ({ children }) => {
    const outler = useOutletContext();
    return children(outler);
};

class PostCourier extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      input_id: null,
      input_type: null,
      input_regions: null,
      input_time: null,

    };
    this.postCour = this.postCour.bind(this);
  }

  async postCour() {

   //const data = '{"couriers": []}'
   console.log(this.state.input_id)
   var data = ""
   //const regions = this.state.input_regions ? this.state.input_regions.join(",") : ""

   if (this.state.input_time != null) {
      data = `{"couriers": [{"courier_id": ${this.state.input_id}, "courier_type": "${this.state.input_type}", "regions": [${ this.state.input_regions}], "working_hours": ["${this.state.input_time}"]}]}`
  }
    else {
    data = `{"couriers": [{"courier_id": ${this.state.input_id}, "courier_type": "${this.state.input_type}", "regions": [${ this.state.input_regions}]}]}`
    console.log(data)
  }
  this.state.input_time = null
  this.state.input_regions = null

   //data = `{"couriers": [{"courier_id": ${this.state.input_id}, "courier_type": "${this.state.input_type}", "regions": [${ this.state.input_regions}]}]}`
   console.log(data)
   //data = `{"couriers": [{"courier_id": ${this.state.input_id}, "courier_type": "${this.state.input_type}", "regions": [${ this.state.input_regions}]}]}`
   console.log(data)
   //console.log(`{"couriers": [{"courier_id": ${this.state.input_id}, "courier_type": "${this.state.input_type}", "regions": [${ this.state.input_regions}]}]}`)

   const response = await fetch('/couriers', {
   method: "POST",
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },
   body: data
 })
 console.log(response)

try {
 //const to_print = await response.json();
 this.setState({ response: "Успех!"})
}
catch {
  this.setState({ response: "Проверьте корректность введёных данных, возможно курьер с таким ID уже существует, или вы забыли прописать тип"})
}

 }



  updateID(evt) {
     const val = evt.target.value;
     this.setState({
         input_id: val
     })
  }
  updateType(evt) {
     const val = evt.target.value;
     this.setState({
         input_type: val
     })
  }
  updateRegions(evt) {
     const val = evt.target.value;
     this.setState({
         input_regions: val.split(',')
     })
  }
  updateTime(evt) {
     const val = evt.target.value;
     this.setState({
         input_time: val
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
                    Courier ID
                  </label>

                  <div className="inline-flex items-center justify-center absolute left-0 top-[0.85rem] h-full w-10 text-gray-400">
                    <FontAwesomeIcon icon={faMale} />
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
                    Courier type
                  </label>

                  <div className="inline-flex items-center justify-center absolute left-0 top-[0.85rem] h-full w-10 text-gray-400">
                    <FontAwesomeIcon icon={faCar} />
                  </div>
                  <input
                    id="inputWithIcon"
                    type="text"
                    name="inputWithIcon"
                    onChange={evt => this.updateType(evt)}
                    className="text-sm placeholder-gray-500 pl-10 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="FOOT || BIKE || AUTO"
                  />
                </div>




                <div className="mt-6 relative">
                  <label
                    htmlFor="inputWithIcon"
                    className="text-sm text-gray-600"
                  >
                    Regions
                  </label>

                  <div className="inline-flex items-center justify-center absolute left-0 top-[0.85rem] h-full w-10 text-gray-400">
                    <FontAwesomeIcon icon={faMapMarker} />
                  </div>
                  <input
                    id="inputWithIcon"
                    type="text"
                    name="inputWithIcon"
                    onChange={evt => this.updateRegions(evt)}
                    className="text-sm placeholder-gray-500 pl-10 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="x, y, z, ..."
                  />
                </div>




                <div className="mt-6 relative">
                  <label
                    htmlFor="inputWithIcon"
                    className="text-sm text-gray-600"
                  >
                    Working Hours
                  </label>

                  <div className="inline-flex items-center justify-center absolute left-0 top-[0.85rem] h-full w-10 text-gray-400">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <input
                    id="inputWithIcon"
                    type="text"
                    name="inputWithIcon"
                    onChange={evt => this.updateTime(evt)}
                    className="text-sm placeholder-gray-500 pl-10 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                    placeholder="HH:MM-HH:MM"
                  />
                </div>

                <div className="mt-6 flex flex-row gap-4">
                  <button className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm" onClick={this.postCour}>
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

export { PostCourier };

import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart
} from "recharts";
import FirebaseGraph from "./FirebaseGraph";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: [],
      endpoint: "35.188.194.243" // เชื่อมต่อไปยัง url ของ realtime server
    };
  }

  componentDidMount = () => {
    const { endpoint, message } = this.state;
    const temp = message;
    const socket = socketIOClient(endpoint);
    socket.on("new-message", messageNew => {
      temp.push(messageNew);
      this.setState({ message: temp });
    });
  };

  render() {
    const { message } = this.state;
    console.log(message);

    return (
      <div>
        <h2>Realtime Socket</h2>
        <LineChart
          width={900}
          height={500}
          data={[
            ...message,
            { time: "12.02", count: 5 },
            { time: "12.01", count: 3 },
            { time: "12.00", count: 5 }
          ].reverse()}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
        <h2>With Firebase</h2>
        <FirebaseGraph />
      </div>
    );
  }
}

export default App;

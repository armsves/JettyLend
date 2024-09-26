import "./App.css";
import DevModeInstruction from "./components/DevModeInstruction";
import Navbar from "./components/Navbar";
import DocumentationSection from "./components/DocumentationSection";
import HelloTokenSection from "./components/HelloTokenSection";
import Lending from "./components/Lending";
import Borrowing from "./components/Borrowing";
import Withdraw from "./components/Withdraw";
import Payback from "./components/Payback";
import Footer from "./components/Footer";


function App( {gatewayApi}:any ) {
  return (
    <>
      <Navbar />
        <div className="quadrant-container">
          <div className="quadrant-item">
            <Lending gatewayApi={gatewayApi}/>
          </div>
          <div className="quadrant-item">
            <Borrowing gatewayApi={gatewayApi}/>
          </div>
          <div className="quadrant-item">
            <Withdraw gatewayApi={gatewayApi}/>
          </div>
        </div>
        <Footer />
    </>
  );
}

export default App;

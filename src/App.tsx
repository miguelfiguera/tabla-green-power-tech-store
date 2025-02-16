import React, { useEffect } from "react";
import useStore from "./Helpers/zustand/state";
import Table from "./Table";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const {
    active,
    email,
    passphrase,
    check,
    setActive,
    setEmail,
    setPassphrase,
    setCheck,
  } = useStore();

  useEffect(() => {
    function activate() {
      if (!check) {
        return;
      }
      if (
        email === "me.rojas@rradvisor.net" &&
        passphrase === "rradvisor2025.."
      ) {
        toast.success("Welcome Manager.");
        setActive(true);
      } else {
        toast.error("Invalid credentials.");
        setCheck(false);
        setActive(false);
      }
    }

    activate();
  }, [check]);

  return (
    <div className="container">
      <ToastContainer />
      <h1 className="text-center py-5">Green Power Tech Store</h1>

      <div className="container">
        {!active && (
          <div className="d-flex justify-content-center">
            <div className="col-5">
              <input
                type="text"
                className="form-control my-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="form-control my-2"
                placeholder="Passphrase"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={() => setCheck(true)}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="container m-4">{active && <Table />}</div>
    </div>
  );
}

export default App;

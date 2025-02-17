import { useReducer } from "react";
import { batteries } from "./Helpers/Batteries";
import { toast } from "react-toastify";

interface State {
  watts: number;
  PV: number;
  GreenTechPpw: number;
  SellerPpw: number;
  gananciaDV: boolean;
  batteryType: number;
  gananciaGreenPowerTech: number;
  gananciaConsultor: number;
  gananciaDirector: number;
  redline: number;
  batteryBonus: number;
}

type Action =
  | { type: "SET_WATTS"; payload: number }
  | { type: "SET_PV"; payload: number }
  | { type: "SET_GREENTECH_PPW"; payload: number }
  | { type: "SET_SELLER_PPW"; payload: number }
  | { type: "SET_GANANCIA_DV"; payload: boolean }
  | { type: "SET_BATTERY_TYPE"; payload: number }
  | { type: "CALCULATE" };

const initialState: State = {
  watts: 405,
  PV: 0,
  GreenTechPpw: 0.4, // Default within range
  SellerPpw: 0.5, // Default within range
  gananciaDV: false,
  batteryType: 13000,
  gananciaGreenPowerTech: 0,
  gananciaConsultor: 0,
  gananciaDirector: 0,
  redline: 2.2,
  batteryBonus: 1000,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_WATTS":
      return { ...state, watts: action.payload };
    case "SET_PV":
      return { ...state, PV: action.payload };
    case "SET_GREENTECH_PPW":
      return { ...state, GreenTechPpw: action.payload };
    case "SET_SELLER_PPW":
      return { ...state, SellerPpw: action.payload };
    case "SET_GANANCIA_DV":
      return { ...state, gananciaDV: action.payload };
    case "SET_BATTERY_TYPE":
      return { ...state, batteryType: action.payload };
    case "CALCULATE":
      const batteryBonus =
        state.batteryType === 13000
          ? 1000
          : state.batteryType === 26000
          ? 2000
          : 3000;
      const gananciaGreenPowerTech = !state.gananciaDV
        ? state.watts * state.PV * state.GreenTechPpw -
          state.watts * state.PV * state.GreenTechPpw * 0.05
        : state.watts * state.PV * (state.GreenTechPpw - 0.1) -
          state.watts * state.PV * (state.GreenTechPpw - 0.1) * 0.05;
      const gananciaConsultor =
        state.watts * state.PV * state.SellerPpw -
        state.watts * state.PV * state.SellerPpw * 0.05; // Example calculation
      const gananciaDirector = !state.gananciaDV
        ? 0
        : state.watts * state.PV * 0.1 - state.watts * state.PV * 0.1 * 0.05; // Example calculation
      return {
        ...state,
        gananciaGreenPowerTech,
        gananciaConsultor,
        gananciaDirector,
        batteryBonus,
      };
    default:
      return state;
  }
};

const Table = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const batteryOptions = batteries; // Example

  const handleCalculate = () => {
    dispatch({ type: "CALCULATE" });
  };

  function checkValues() {
    if (state.watts * state.PV < 4050) {
      toast.error("Placas Insuficientes");
      dispatch({ type: "SET_WATTS", payload: 405 });
      dispatch({ type: "SET_PV", payload: 10 });
      return;
    }
    if (state.GreenTechPpw != 0.4) {
      toast.error("PPW GreenTech fuera de rango, tienes permiso de oxor?");
    }
    if (state.GreenTechPpw < 0.2) {
      toast.error("PPW GreenTech fuera de rango, reset al minimo");
      dispatch({ type: "SET_GREENTECH_PPW", payload: 0.2 });
    }

    if (state.SellerPpw < 0.25) {
      toast.error("PPW Seller fuera de rango, tienes permiso del vendedor?");
      dispatch({ type: "SET_SELLER_PPW", payload: 0.25 });
      return;
    }
    if (state.batteryType == 13000 && state.PV > 19) {
      toast.warning("No puedes vender mas de 19 PV con bateria de 13k");
      dispatch({ type: "SET_PV", payload: 19 });
      return;
    }

    toast.success("Ok, puedes proceder.");
    handleCalculate();
  }

  const handleCopyToClipboard = () => {
    const textToCopy = `
Case PK: \n
Client Name: \n
Client Address: \n
Size: ${state.watts * state.PV} \n
Battery Type: ${
      state.batteryType == 13000
        ? "Tesla 13.5kWh"
        : state.batteryType === 26000
        ? "Tesla 27kWh"
        : "Tesla 40kWh"
    } \n
Battery Price: ${state.batteryType} \n
Target PPW: ${(
      state.redline +
      state.GreenTechPpw +
      state.SellerPpw +
      state.batteryType / (state.watts * state.PV)
    ).toFixed(2)} \n
Bono de Bateria: ${state.batteryBonus} \n
--------------------------------------------------------------------
Ganancia Green Power Tech: ${(
      state.gananciaGreenPowerTech + state.batteryBonus
    ).toFixed(2)} \n
Ganancia Consultor: ${state.gananciaConsultor.toFixed(2)} \n
Ganancia Director: ${state.gananciaDirector.toFixed(2)} \n
Notas: 
`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Resultados copiados al portapapeles!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Error al copiar al portapapeles.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Valores</h2>

      <div className="mb-3">
        <label htmlFor="RedLine" className="form-label">
          Redline:
        </label>
        <input
          type="number"
          className="form-control"
          id="watts"
          readOnly={true}
          value={state.redline}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="watts" className="form-label">
          Watts:
        </label>
        <input
          type="number"
          className="form-control"
          id="watts"
          value={state.watts}
          onChange={(e) =>
            dispatch({ type: "SET_WATTS", payload: parseFloat(e.target.value) })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="pv" className="form-label">
          PV:
        </label>
        <input
          type="number"
          className="form-control"
          id="pv"
          value={state.PV}
          onChange={(e) =>
            dispatch({ type: "SET_PV", payload: parseFloat(e.target.value) })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="greenTechPpw" className="form-label">
          GreenTechPpw (0.2 - 0.4):
        </label>
        <input
          type="number"
          className="form-control"
          id="greenTechPpw"
          value={state.GreenTechPpw}
          min="0.2"
          max="0.4"
          step="0.1"
          onChange={(e) =>
            dispatch({
              type: "SET_GREENTECH_PPW",
              payload: parseFloat(e.target.value),
            })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="sellerPpw" className="form-label">
          SellerPpw (min 0.25):
        </label>
        <input
          type="number"
          className="form-control"
          id="sellerPpw"
          value={state.SellerPpw}
          min="0.25"
          step="0.1"
          onChange={(e) =>
            dispatch({
              type: "SET_SELLER_PPW",
              payload: parseFloat(e.target.value),
            })
          }
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="gananciaDV"
          checked={state.gananciaDV}
          onChange={(e) =>
            dispatch({ type: "SET_GANANCIA_DV", payload: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="gananciaDV">
          Ganancia para el D.V.
        </label>
      </div>

      <div className="mb-3">
        <label htmlFor="batteryType" className="form-label">
          Battery:
        </label>
        <select
          className="form-select"
          id="batteryType"
          value={state.batteryType}
          onChange={(e) =>
            dispatch({
              type: "SET_BATTERY_TYPE",
              payload: Number(e.target.value),
            })
          }
        >
          {batteryOptions.map((option) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-success mx-2" onClick={checkValues}>
        {" "}
        Check Values
      </button>

      <button className="btn btn-primary mx-2" onClick={handleCalculate}>
        Calculate
      </button>
      <button
        className="btn btn-secondary mx-2"
        onClick={handleCopyToClipboard}
      >
        Copy Values
      </button>

      <div className="d-lg-flex flex-row justify-content-center">
        <div className="col">
          <h2 className="mt-4">Resultados</h2>
          <p>Size: {state.watts * state.PV}</p>
          <p>Battery Price: {state.batteryType}</p>
          <p>
            Target PPW:{" "}
            {(
              state.redline +
              state.GreenTechPpw +
              state.SellerPpw +
              state.batteryType / (state.watts * state.PV)
            ).toFixed(2)}
          </p>
          <p> Bono de Bateria: {state.batteryBonus}</p>
        </div>
        <div className="col">
          <h2 className="mt-4">Ganancia</h2>
          <p>
            Ganancia Green Power Tech:{" "}
            {(state.gananciaGreenPowerTech + state.batteryBonus).toFixed(2)}
          </p>
          <p>Ganancia Consultor: {state.gananciaConsultor.toFixed(2)}</p>
          <p>Ganancia Director: {state.gananciaDirector.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Table;

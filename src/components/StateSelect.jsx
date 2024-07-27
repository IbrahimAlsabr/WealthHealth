import Select from "react-select";
import { states } from "../data/state";

const stateOptions = states.map((state) => ({
    value: state.abbreviation,
    label: state.name,
}));

// eslint-disable-next-line react/prop-types
const StateSelect = ({ selectedState, setSelectedState }) => {
    return (
        <div>
            <label htmlFor="state">State</label>
            <Select
                id="state"
                options={stateOptions}
                value={selectedState}
                onChange={setSelectedState}
            />
        </div>
    );
};

export default StateSelect;

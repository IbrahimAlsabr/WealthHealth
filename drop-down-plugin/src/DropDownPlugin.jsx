import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

function DropDown({ data, onSelect, ASC, initialOption }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropDown = () => setIsOpen(!isOpen);

    const validatedData = data.map((item) => ({
        ...item,
        name: item.name || "Unknown",
    }));

    let sortedData;
    if (ASC) {
        sortedData = validatedData.sort((a, b) =>
            a.name.localeCompare(b.name, "fr")
        );
    } else {
        sortedData = validatedData;
    }

    const [optionSelected, setOptionSelected] = useState(
        sortedData ? sortedData[0].name : ""
    );

    useEffect(() => {
        if (initialOption) {
            setOptionSelected(initialOption);
        }
    }, [initialOption]);

    const handleOptionSelected = (option) => {
        if (Array.isArray(option)) {
            setOptionSelected(option[1]);
            onSelect(option[0]);
        } else {
            setOptionSelected(option);
            onSelect(option);
        }
        setIsOpen(false);
    };

    const listRef = useRef(null);
    useEffect(() => {
        if (listRef.current) {
            const selectedOptionElement = listRef.current.querySelector(
                `[data-option="${optionSelected}"]`
            );
            if (selectedOptionElement) {
                const scrollTo =
                    selectedOptionElement.offsetTop - listRef.current.offsetTop;
                listRef.current.scrollTo({ top: scrollTo, behavior: "smooth" });
            }
        }
    }, [isOpen, optionSelected]);

    return (
        <div className="container">
            <div className="header" onClick={toggleDropDown}>
                <div>{optionSelected}</div>
                <div>{isOpen ? <FaCaretUp /> : <FaCaretDown />}</div>
            </div>
            {isOpen && (
                <div ref={listRef} className="list" data-testid="dropDownList">
                    {sortedData.map((item, index) => (
                        <div
                            data-testid={`option-${item.name}`}
                            data-option={item.name}
                            key={index}
                            onClick={() => {
                                item.abbreviation
                                    ? handleOptionSelected([
                                          item.abbreviation,
                                          item.name,
                                      ])
                                    : handleOptionSelected(item.name);
                            }}
                            onMouseOver={(event) => {
                                event.target.style.backgroundColor = "#d3cdcd";
                            }}
                            onMouseOut={(event) => {
                                event.target.style.backgroundColor = "#fff";
                            }}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

DropDown.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    onSelect: PropTypes.func.isRequired,
    ASC: PropTypes.bool,
    initialOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DropDown;

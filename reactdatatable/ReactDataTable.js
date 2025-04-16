(() => {
    const Filters = (props) => {
        const updateSportType = (e) => {
            props.updateFormState({
                SportType: e.target.value,
            });
        };

        const updateActiveStatus = (e) => {
            const value = e.target.value;
            // Fixing the filter to use 'isActive' correctly
            props.updateFormState({
                isActive: value === "true" ? true : value === "false" ? false : null,
            });
        };

        const updateSearchName = (e) => {
            props.updateFormState({
                searchName: e.target.value,
            });
        };

        const updateAgeFilter = (e) => {
            props.updateFormState({
                Age: e.target.value,
            });
        };

        const handleButtonClick = () => {
            alert("You are a Champion!");
        };

        return (
            <React.Fragment>
                <h3><b>My Data Filterer:</b></h3>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <b>Sports Type</b>
                        </div>
                        <div className="col-md-3">
                            <select onChange={updateSportType}>
                                <option value="">All</option>
                                <option value="Winter">Winter</option>
                                <option value="Summer">Summer</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <b>Active</b>
                        </div>
                        <div className="col-md-3">
                            <select onChange={updateActiveStatus}>
                                <option value="">All</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="col-md-3 mt-3">
                            <label htmlFor="searchName">Enter Olympian name:</label>
                            <input
                                type="text"
                                id="searchName"
                                name="searchName"
                                onChange={updateSearchName}
                                placeholder="Name"
                                className="form-control"
                            />
                        </div>
                        <div>
                            <b>Age filter</b>
                            <div className="slider-filter col-md-3">
                                <label>Filter by Age:</label>
                                <input
                                    type="range"
                                    min="18"
                                    max="70"
                                    value={props.age} // Bind the value to state
                                    onChange={updateAgeFilter}
                                />
                                <span>{`Age: ${props.age}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center col-mt-6">
                    <button type="button" onClick={handleButtonClick}>Click Me!</button>
                </div>
            </React.Fragment>
        );
    };

    const DataTable = (props) => {
        const handleCellEdit = (rowIndex, columnName, newValue) => {
            props.updateRow(rowIndex, columnName, newValue);
        };

        return (
            <table className="table text-center table-striped mt-3">
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Olympian</th>
                        <th>Sports</th>
                        <th>SportType</th>
                        <th>Active</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {props.dataToDisplay.map((row, i) => (
                        <tr key={i}>
                            <td
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleCellEdit(i, "Country", e.target.textContent)}
                            >
                                {row.Country}
                            </td>
                            <td
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleCellEdit(i, "olympian", e.target.textContent)}
                            >
                                {row.olympian}
                            </td>
                            <td
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleCellEdit(i, "Sports", e.target.textContent)}
                            >
                                {row.Sports}
                            </td>
                            <td
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleCellEdit(i, "SportType", e.target.textContent)}
                            >
                                {row.SportType}
                            </td>
                            <td>{row.isActive ? "Yes" : "No"}</td>
                            <td
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleCellEdit(i, "Age", e.target.textContent)}
                            >
                                {row.Age}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    class ReactDataTable extends React.Component {
        constructor(props) {
            super(props);

            this.originalData = props.originalData;
            this.state = {
                SportType: "",
                isActive: null, // Can be true, false, or null for 'All'
                searchName: "",
                Age: 40,
            };

            this.updateFormState = this.updateFormState.bind(this);
        }

        updateFormState(update) {
            this.setState(update);
        }

        render() {
            let filteredData = this.originalData;

            // Filter by SportType (Winter or Summer)
            if (this.state.SportType) {
                filteredData = filteredData.filter(
                    (row) => row.SportType === this.state.SportType
                );
            }

            // Filter by isActive (Yes or No)
            if (this.state.isActive !== null) {
                filteredData = filteredData.filter(
                    (row) => row.isActive === this.state.isActive
                );
            }

            // Filter by searchName
            if (this.state.searchName) {
                const searchNameLower = this.state.searchName.toLowerCase();
                filteredData = filteredData.filter((row) =>
                    row.olympian.toLowerCase().includes(searchNameLower)
                );
            }

            // Filter by Age
            if (this.state.Age) {
                filteredData = filteredData.filter((row) => row.Age <= this.state.Age);
            }
            console.log(filteredData);
            return (
                <React.Fragment>
                    <Filters updateFormState={this.updateFormState} age={this.state.Age} />
                    <hr />
                    <DataTable dataToDisplay={filteredData} updateRow={(rowIndex, columnName, newValue) => {
                        const updatedData = [...this.originalData];
                        updatedData[rowIndex][columnName] = newValue;
                        this.originalData = updatedData;
                        this.setState({});
                    }} />
                </React.Fragment>
            );
        }
    }
    const lolData = [
        {
            Country: "USA",
            olympian: "Michael Phelps",
            Sports: "Swimming",
            SportType: "Summer",
            isActive: true,
            Age: 40,
        },
        {
            Country: "USA",
            olympian: "Simone Biles",
            Sports: "Gymnastics",
            SportType: "Summer",
            isActive: true,
            Age: 27,
        },
        {
            Country: "USA",
            olympian: "Carl Lewis",
            Sports: "Track and Field",
            SportType: "Summer",
            isActive: true,
            Age: 63,

        },
        {
            Country: "Russia",
            olympian: "Evgeni Plushenko",
            Sports: "Figure Skating",
            SportType: "Winter",
            isActive: true,
            Age: 41,
        },
        {
            Country: "Russia",
            olympian: "Tatiana Navka",
            Sports: "Figure Skating",
            SportType: "Winter",
            isActive: true,
            Age: 49,
        },
        {
            Country: "Great Britain",
            olympian: "Sir Bradley Wiggins",
            Sports: "Cycling",
            SportType: "Summer",
            isActive: true,
            Age: 44,
        },
        {
            Country: "Germany",
            olympian: "Birgit Fischer",
            Sports: "Canoeing",
            SportType: "Summer",
            isActive: true,
            Age: 62,
        },
        {
            Country: "China",
            olympian: "Sun Yang",
            Sports: "Swimming",
            SportType: "Summer",
            isActive: true,
            Age: 32,
        },
        {
            Country: "Kenya",
            olympian: "Eliud Kipchoge",
            Sports: "Marathon",
            SportType: "Summer",
            isActive: true,
            Age: 39,
        },
        {
            Country: "Jamaica",
            olympian: "Usain Bolt",
            Sports: "Track and Field",
            SportType: "Summer",
            isActive: true,
            Age: 38,
        },
        {
            Country: "Norway",
            olympian: "Ole Einar Bjørndalen",
            Sports: "Biathlon",
            SportType: "Winter",
            isActive: true,
            Age: 50,
        },
        {
            Country: "Canada",
            olympian: "Clara Hughes",
            Sports: "Cycling, Speed Skating",
            SportType: "Summer, Winter",
            isActive: true,
            Age: 52,
        },
        {
            Country: "South Korea",
            olympian: "Yuna Kim",
            Sports: "Figure Skating",
            SportType: "Winter",
            isActive: true,
            Age: 34,
        },
        {
            Country: "Australia",
            olympian: "Ian Thorpe",
            Sports: "Swimming",
            SportType: "Summer",
            isActive: true,
            Age: 42,
        },
        {
            Country: "France",
            olympian: "Teddy Riner",
            Sports: "Judo",
            SportType: "Summer",
            isActive: true,
            Age: 35,
        },
        {
            Country: "New Zealand",
            olympian: "Valerie Adams",
            Sports: "Shot Put",
            SportType: "Summer",
            isActive: true,
            Age: 39,
        },
        {
            Country: "Spain",
            olympian: "Rafa Nadal",
            Sports: "Tennis",
            SportType: "Summer",
            isActive: true,
            Age: 38,
        },
        {
            Country: "Italy",
            olympian: "Alessandro Del Piero",
            Sports: "Football",
            SportType: "Summer",
            isActive: false,
            Age: 49,
        },
        {
            Country: "Brazil",
            olympian: "Neymar Jr.",
            Sports: "Football",
            SportType: "Summer",
            isActive: true,
            Age: 32,
        },
        {
            Country: "South Africa",
            olympian: "Chad le Clos",
            Sports: "Swimming",
            SportType: "Summer",
            isActive: true,
            Age: 32,
        },
        {
            Country: "Finland",
            olympian: "Mika Häkkinen",
            Sports: "Formula 1 Racing",
            SportType: "Summer",
            isActive: true,
            Age: 56,
        },
        {
            Country: "Japan",
            olympian: "Noriaki Kasai",
            Sports: "Ski Jumping",
            SportType: "Winter",
            isActive: true,
            Age: 51,
        },
        {
            Country: "Argentina",
            olympian: "Lionel Messi",
            Sports: "Football",
            SportType: "Summer",
            isActive: true,
            Age: 37,
        },
        {
            Country: "India",
            olympian: "PV Sindhu",
            Sports: "Badminton",
            SportType: "Summer",
            isActive: false,
            Age: 29,
        },
        {
            Country: "Mexico",
            olympian: "Guillermo Pérez",
            Sports: "Taekwondo",
            SportType: "Summer",
            isActive: true,
            Age: 43,
        },
        {
            Country: "Denmark",
            olympian: "Mette Poulsen",
            Sports: "Badminton",
            SportType: "Summer",
            isActive: false,
            Age: 30,
        },
        {
            Country: "Sweden",
            olympian: "Sarah Sjöström",
            Sports: "Swimming",
            SportType: "Summer",
            isActive: true,
            Age: 31,
        },
        {
            Country: "Ukraine",
            olympian: "Yulia Lipnitskaya",
            Sports: "Figure Skating",
            SportType: "Winter",
            isActive: false,
            Age: 26,
        },
        {
            Country: "Estonia",
            olympian: "Kristina Šmigun-Vähi",
            Sports: "Cross-country Skiing",
            SportType: "Winter",
            isActive: true,
            Age: 46,
        },
        {
            Country: "Poland",
            olympian: "Kamil Stoch",
            Sports: "Ski Jumping",
            SportType: "Winter",
            isActive: false,
            Age: 37,
        },
        {
            Country: "Italy",
            olympian: "Federico Pellegrino",
            Sports: "Cross-country Skiing",
            SportType: "Winter",
            isActive: false,
            Age: 33,
        },
        {
            Country: "Turkey",
            olympian: "Riza Kayaalp",
            Sports: "Wrestling",
            SportType: "Summer",
            isActive: false,
            Age: 34,
        },
        {
            Country: "Iran",
            olympian: "Saeid Morad Abdvali",
            Sports: "Wrestling",
            SportType: "Summer",
            isActive: true,
            Age: 34,
        },
        {
            Country: "Poland",
            olympian: "Robert Lewandowski",
            Sports: "Football",
            SportType: "Summer",
            isActive: true,
            Age: 36,
        },
        {
            Country: "Czech Republic",
            olympian: "Martin Fourcade",
            Sports: "Biathlon",
            SportType: "Winter",
            isActive: true,
            Age: 35,
        },
        {
            Country: "Slovenia",
            olympian: "Tina Maze",
            Sports: "Alpine Skiing",
            SportType: "Winter",
            isActive: true,
            Age: 41,
        },
        {
            Country: "Slovakia",
            olympian: "Lukáš Kováč",
            Sports: "Track and Field",
            SportType: "Summer",
            isActive: false,
            Age: 28
        },
        {
            Country: "Finland",
            olympian: "Timo Sarpaneva",
            Sports: "Skiing",
            SportType: "Winter",
            isActive: true,
            Age: 79
        },
        {
            Country: "Croatia",
            olympian: "Janica Kostelić",
            Sports: "Alpine Skiing",
            SportType: "Winter",
            isActive: false,
            Age: 42,
        },
        {
            Country: "Romania",
            olympian: "Simona Halep",
            Sports: "Tennis",
            SportType: "Summer",
            isActive: true,
            Age: 33,
        },
        {
            Country: "Bulgaria",
            olympian: "Stefka Kostadinova",
            Sports: "Track and Field",
            SportType: "Summer",
            isActive: true,
            Age: 59
        },
        {
            Country: "New Zealand",
            olympian: "Lisa Carrington",
            Sports: "Canoeing",
            SportType: "Summer",
            isActive: false,
            Age: 35,
        },
        {
            Country: "Germany",
            olympian: "Katarina Witt",
            Sports: "Figure Skating",
            SportType: "Winter",
            isActive: false,
            Age: 59,
        }


    ];

    const container = document.getElementById("react-data-table");
    const root = ReactDOM.createRoot(container);
    root.render(<ReactDataTable originalData={lolData} />);
})();

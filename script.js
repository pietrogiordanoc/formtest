body {
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f4f4;
    color: #333;
    font-size: 0.9em;
}

form {
    background-color: #fff;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 900px;
    max-width: 90%;
}

h2 {
    text-align: center;
    color: #3498db;
    margin-bottom: 20px;
    font-size: 1.6em;
}

h3 {
    color: #2c3e50;
    margin-top: 15px;
    margin-bottom: 12px;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 4px;
    font-size: 1.2em;
}

label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: #555;
    font-size: 0.95em;
}

input[type="text"],
input[type="email"],
input[type="date"],
input[type="number"],
textarea,
select {
    width: 100%;
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
    transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="date"]:focus,
input[type="number"]:focus,
textarea:focus,
select:focus {
    border-color: #3498db;
    outline: none;
}

input[type="radio"],
input[type="checkbox"] {
    margin-right: 6px;
    margin-bottom: 10px;
}

div>label {
    display: inline;
    font-weight: normal;
    color: #777;
}

div {
    margin-bottom: 10px;
}

button {
    background-color: #3498db;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #2980b9;
}

.form-row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
}

.qt-price-row {
    display: flex;
    gap: 12px;
}

.form-column {
    flex: 1;
    padding-right: 15px;
}

@media (max-width: 768px) {
    .form-column {
        flex-basis: 100%;
        padding-right: 0;
    }

    .qt-price-row {
        flex-direction: column;
        gap: 6px;
    }
}

.section-divider {
    height: 2px;
    background-color: #ddd;
    margin: 25px 0;
}

.add-part,
.add-workforce,
.add-equipment {
    background-color: #27ae60;
    color: white;
    padding: 9px 13px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 8px;
    transition: background-color 0.3s;
    display: block;
    width: auto;
    margin-left: auto;
    font-size: 0.9em;
}

.add-part:hover,
.add-workforce:hover,
.add-equipment:hover {
    background-color: #219653;
}

.parts .form-row,
.workforce .form-row,
.equipment .form-row {
    margin-bottom: 6px;
}

.parts .form-row input,
.workforce .form-row input,
.equipment .form-row input,
.parts .form-row select,
.workforce .form-row select,
.equipment .form-row select {
    margin-bottom: 6px;
}

.grand-total-section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 0;
    font-size: 1.1em;
    border-top: 2px solid #ddd;
    margin-top: 20px;
}

.grand-total-section label {
    margin-right: 10px;
    font-weight: bold;
    display: inline-block;
}

.grand-total-section input[type="text"] {
    width: auto;
    text-align: right;
    font-weight: bold;
    font-size: 1.1em;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

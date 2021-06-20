import "../styles/style.css";

import ThemeContext from "../contexts/themecontext";

function Button() {
  return (
    <ThemeContext.Consumer>
      {(value) => <button className={value}>Submit</button>}
    </ThemeContext.Consumer>
  );
}

export default Button;

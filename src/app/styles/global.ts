import { rgba, shade } from 'polished';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${(props) => props.theme.colors.text};
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  .primary {
    background: ${(props) => props.theme.colors.primary.dark};
    color: ${(props) => props.theme.colors.primary.light};

    &:hover {
      background: ${(props) => shade(0.2, props.theme.colors.primary.dark)};
    }
  }

  .secondary {
    background: ${(props) => props.theme.colors.secondary.dark};
    color: ${(props) => props.theme.colors.secondary.light};

    &:hover {
      background: ${(props) => shade(0.2, props.theme.colors.secondary.dark)};
    }
  }

  .modal{
    background-color: ${(props) => props.theme.colors.card.background};
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    padding: 32px;
    border-radius: 8px;
  }

  .quick-search{
    background-color: ${(props) => props.theme.colors.card.background};
    position: absolute;
    top: 10%;
    left: calc( 50% -  500px / 2 );
    right: auto;
    bottom: auto;

    margin-right: -50%;
    border-radius: 8px;
    width: 500px;

    div {
      padding: 3px;
    }

    ul{
      li{
        list-style: none;
        border-bottom: 1px solid ${(props) =>
          rgba(props.theme.colors.text, 0.4)};
        padding: 10px;
        &:first-child {
          padding-top: 16px;
        }
        &:last-child {
          border-bottom: 0;
        }
        
        span{
          svg{
            margin-right: 7px;
            margin-bottom: -5px;
          }
          padding: 7px  10px;
        }

        button{
          float: right;
        }
      }
    }
  }

  .modal-overlay{
    background-color: ${(props) => rgba(props.theme.colors.text, 0.4)};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
  }

  .selected {
    box-shadow: 0 0 10px ${(props) => rgba(props.theme.colors.text, 0.9)};
    border-radius: 10px;
  }
`;

import ReactDOM from "react-dom";
import { ReactStrictMode, rootElement, moduleHotAccept } from "./index";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("index.js", () => {
  it("renders without crashing", () => {
    ReactDOM.render(ReactStrictMode, rootElement);
    expect(ReactDOM.render).toHaveBeenCalledWith(ReactStrictMode, rootElement);
  });

  it("should only call hot.accept() if hot is defined", () => {
    const accept = jest.fn();
    const mockModule = { hot: { accept } };
    moduleHotAccept(mockModule);
    expect(accept).toHaveBeenCalled();
  });

  it("should not throw if module is undefined", () => {
    expect(moduleHotAccept).not.toThrow();
  });

  it("should not throw if module.hot is undefined", () => {
    expect(() => moduleHotAccept({ notHot: -273 })).not.toThrow();
  });
});

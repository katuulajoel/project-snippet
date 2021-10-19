import * as utils from "../stringUtils";

describe("string utils tests", () => {
 
  it("should return correct values ", () => {
    expect(utils.generateRandomString()).toBeTruthy();
    expect(utils.generateRandomString().length).toBe(8);
    expect(utils.generateRandomString(10).length).toBe(10);
    expect(utils.numberWithCommas()).toBeTruthy();    
    expect(utils.numberWithCommas(14)).toBeTruthy();    
    // expect(utils.numberWithCommas(dummyUser)).toBeTruthy();    
  });

});

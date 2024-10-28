const axios = require("../utils/axios");
const { index, create, show, update, destroy } = require("../src/main");

const BASE_URL = "http://localhost:5000";
jest.mock('axios');

describe("Assignment", () => {

  describe("index()", () => {
    const data = [
      {
        id: "HwLvy2S",
        name: "Ursa Minor",
        meaning: "Little Bear",
        starsWithPlanets: 6,
        quadrant: "NQ3",
      },
      {
        id: "dFBbdkr",
        name: "Vela",
        meaning: "Sails",
        starsWithPlanets: 7,
        quadrant: "SQ2",
      },
    ];

    const resp = {data: data};

    beforeEach(() => {
      jest.spyOn(axios, 'get');
      axios.get.mockImplementation(() => Promise.resolve(resp));
      const spy = jest.spyOn(console, 'log').mockImplementation();
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should make a GET request to the appropriate URL", async () => {
      await index();
      const expectedURL = `${BASE_URL}/constellations`;
      expect(axios.get).toHaveBeenCalledWith(expectedURL);
    });

    it("should log a list of all constellations", async () => {
      await index();
      expect(console.log).toHaveBeenCalledWith(data);
    });
  });
  
  describe("create()", () => {
    const body = {
      name: "Triangulum",
      meaning: "Triangle",
      starsWithPlanets: 3,
      quadrant: "NQ1",
    };
    const data = { ...body, id: "abc-def" };
    const resp = {data: data};

    beforeEach(() => {
      jest.spyOn(axios, 'post');
      axios.post.mockImplementation(() => Promise.resolve({data}));
      const spy = jest.spyOn(console, 'log').mockImplementation();
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should make a POST request to the appropriate URL", async () => {
      await create(body);
      const expectedURL = `${BASE_URL}/constellations`;
      expect(axios.post).toHaveBeenCalledWith(expectedURL, body);
    });

    it("should log the response", async () => {
      await create(body);
      expect(console.log).toHaveBeenCalledWith(data);
    });
  });
  
   describe("show()", () => {
    const data = {
      id: "abc-def",
      name: "Triangulum",
      meaning: "Triangle",
      starsWithPlanets: 3,
      quadrant: "NQ1",
    };

    beforeEach(() => {
      jest.spyOn(axios, 'get');
      axios.get.mockImplementation(() => Promise.resolve({data}));
      const spy = jest.spyOn(console, 'log').mockImplementation();
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should make a GET request to the appropriate URL", async () => {
      const { id } = data;
      await show(id);
      const expectedURL = `${BASE_URL}/constellations/${id}`;
      expect(axios.get).toHaveBeenCalledWith(expectedURL);
    });

    it("should log the response", async () => {
      const { id } = data;
      await show(id);
      expect(console.log).toHaveBeenCalledWith(data);
    });
  }); 
  
  describe("update()", () => {
    const data = {
      id: "abc-def",
      name: "Triangulum",
      meaning: "Triangle",
      starsWithPlanets: 3,
      quadrant: "NQ1",
    };
    const body = {
      ...data,
      meaning: "the Triangle",
    };
    
    beforeEach(() => {
      jest.spyOn(axios, 'put');
      axios.put.mockImplementation(() => Promise.resolve({data: body}));
      const spy = jest.spyOn(console, 'log').mockImplementation();
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should make a PUT request to the appropriate URL", async () => {
      const { id } = data;
      await update(id, body);
      const expectedURL = `${BASE_URL}/constellations/${id}`;
      expect(axios.put).toHaveBeenCalledWith(expectedURL, body);
    });

    it("should log the response", async () => {
      const { id } = data;
      await update(id, body);
      expect(console.log).toHaveBeenCalledWith(body);
    });
  });

  describe("destroy()", () => {
    const id = "abc-def";
    
    beforeEach(() => {
      jest.spyOn(axios, 'delete');
      axios.delete.mockImplementation(() => Promise.resolve({data: {} }));
      const spy = jest.spyOn(console, 'log').mockImplementation();
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should make a DELETE request to the appropriate URL", async () => {
      await destroy(id);
      const expectedURL = `${BASE_URL}/constellations/${id}`;
      expect(axios.delete).toHaveBeenCalledWith(expectedURL);
    });

    it("should log out the ID inside of an object", async () => {
      await destroy(id);
      expect(console.log).toHaveBeenCalledWith({});
    });
  });
});

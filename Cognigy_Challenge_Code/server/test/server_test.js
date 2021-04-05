const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
chai.should();
chai.use(chaiHttp);

describe("Server Test", () => {
  // 200 Successful Request
  it("Generate all passwords done successfully", (done) => {
    const body = {
      minLength: 8,
      specialCharacters: 2,
      numbers: 2,
      passwords: 10,
    };
    chai
      .request(server)
      .post("/api")
      .send(body)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.passwordsArr.should.be.a("array");
        res.body.passwordsArr.length.should.be.eq(body.passwords);

        done();
      });
  });

  // 400 Bad Request
  it("Passwords not generated bad request see console", (done) => {
    // test the inputs and value and type
    const body = {
      minLength: 1,
      specialCharacters: 2,
      numbers: 2,
      passwords: 10,
    };
    chai
      .request(server)
      .post("/api")
      .send(body)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        console.log("Bad Request message:", res.body.msg);

        done();
      });
  });

  // 404 Not Found
  it("wrong url or request method", (done) => {
    // test the URL and  method (get post put ...)
    chai
      .request(server)
      .get("/api/passwords")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.msg.should.be.eq("page not found");
        done();
      });
  });
});

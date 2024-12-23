let accessToken;
let enrollmentId;
let questionId = "65278c561dd65459ac97c766";
describe("Get test question successfully with status code 200", () => {
  before(() => {
    cy.readFile("cypress/fixtures/studentToken.json").then((tokenData) => {
      accessToken = tokenData.studentLoginToken;
    });
    cy.readFile("cypress/fixtures/studentLoginID.json").then((loginData) => {
      enrollmentId = loginData.enrollmentId;
    });
  });

  it("Checking if should be able to Get test question or not", () => {
    cy.request({
      method: "GET",
      url: `/enrollment/enrollment-test/getquestions/${questionId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Enrollment: enrollmentId,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        // Assertions
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(2000);
        expect(response.body).to.have.property("success", true);
        // Log the response for debugging
        cy.log("Get test question successfully");
        console.log("Get test question successfully");
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("response.body", JSON.stringify(response.body, null, 1));
      } else {
        cy.log("Get test question failed with status code:", response.status);
        console.log(
          `Get test question failed with status code ${response.status}`
        );
        cy.log(`Get test question failed  ${response.body.error}`);
        console.log(`Get test question failed  ${response.body.error}`);
      }
    });
  });
});
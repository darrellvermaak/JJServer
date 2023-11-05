"use strict";
describe('API Tests - v1 - dirpath tests', () => {
    it('Tests getting a directory path', () => {
        cy.request({
            url: '/api/v1/dirpath',
            method: 'POST',
            body: {
                dirPath: '/home/darrell/Devel/JobJack',
                fromIndex: 0,
                toIndex: 9
            },
        })
            .then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.body).to.contain('Directory found');
            expect(response.status).to.eq(200);
        });
    });
    it('Tests getting a file path', () => {
        cy.request({
            url: '/api/v1/dirpath',
            method: 'POST',
            body: {
                dirPath: '/home/darrell/Devel/JobJack/New Text Document.txt'
            },
        })
            .then((response) => {
            expect(response.body).to.contain('File found');
            expect(response.status).to.eq(200);
        });
    });
});

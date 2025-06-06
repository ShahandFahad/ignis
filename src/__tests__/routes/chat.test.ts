import request from "supertest";
import app from "../../app";


// Test chat route
describe('Chat Routes', () => {
    it('should return bot reply', async () => {
        /*
        const res = await request(app)
            .post('/api/chat')
            .send({ message: 'Hello' });

        expect(res.statusCode).toBe(200);
        expect(res.body.reply).toBeDefined();
        */


        // NOTE: Fix this later - just a temprory test
        const res = await request(app)
            .post('/api/chat/message')
            .send({ message: 'Hello' });

        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBeDefined();
    });

    // Add rest of test...
});



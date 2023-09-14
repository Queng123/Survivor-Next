const router = require('express').Router();
const { custom, update, logo, all } = require('../controllers/api.controller');
const StreamChat = require('stream-chat').StreamChat;
const chat_key = process.env['CHAT_KEY'];
const chat_secret = process.env['CHAT_SECRET'];

const serverClient = StreamChat.getInstance(chat_key, chat_secret);

router.get('/company/custom/:uuid', custom);
router.get('/company/all/:uuid', all);
router.get('/company/update/:uuid', update);
router.get('/company/logo/:uuid', logo);
router.get('/chat/token/:user',
    async (req, res) => {
        const { user } = req.params;
        const token = serverClient.createToken(user);
        res.status(200).send(token);
    }
);
router.get('/chat/channel/:user?:user2',
    async (req, res) => {
        const { user, user2 } = req.params;
        const channel = serverClient.channel(user, user2, {
          name: 'test mon chef',
          created_by_id: user,
        });
        await channel.create();
        await channel.inviteMembers([user, user2]);
        res.status(200);
    }
);

module.exports = router;
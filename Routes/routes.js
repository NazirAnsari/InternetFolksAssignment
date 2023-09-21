const express = require('express')

const router = new express.Router()
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const secretKey = 'secretkey'


const community = require('../Models/communityModel')
const Role = require('../Models/roleModel')
const member = require('../Models/memberModel')
const User = require('../Models/userModel');


router.use(express.urlencoded({ extended: true }));
router.use(express.json());
//role
router.post('/create', async (req, res) => {
  try {
    const id = uuidv4()
    const { name } = req.body
    const role = new Role({ name, id }); // Create a new role instance

    const result = await role.save();
    const responseData = {
      status: true,
      content: {
        data: {
          result
        }
      }
    };
    res.status(201).json(responseData);
  }
  catch (err) {
    res.status(400).json(err)
  }
})

router.get('/getAll', async (req, res) => {
  const result = await Role.find({})
  const responseData = {
    status: true,
    content: {
      data: {
        result
      }
    }
  };
  res.status(201).json(responseData);

})


//user
router.post('/auth/signup', async (req, res) => {

  try {
    const id = uuidv4()
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const newUser = new User({  //creating instance of user
      id: uuidv4(),
      name,
      email,
      password, // Assuming 'password' is already hashed if required
    });

    // Save the user to the database
    const result = await newUser.save();
    const responseData = {
      status: true,
      content: {
        data: {
          result
        }
      }
    };
    jwt.sign({ newUser },
      secretKey, {
      expiresIn: '10000s'
    },
      (err, token) => {
        res.json({ responseData, meta: { token } })
      }
    )

  }
  catch (err) {
    console.log("error to signup")
    res.status(500).json(err)
  }

})

router.post('/auth/signin', validateToken, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const responseData = {
    status: true,
    content: {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      }
    }
  };

  jwt.verify(req.token, secretKey, (err, AuthData) => {
    if (err) {
      res.send({ result: 'invalid token' })
    }
    else {
      res.json({
        message: 'profile accessed',
        status: true,
        content: {
          data: {
            id: AuthData.newUser.id,
            name: AuthData.newUser.name,
            email: AuthData.newUser.email,
            created_at: AuthData.newUser.created_at
          }
        },
        meta: {
          access_token: req.token
        }
      })
    }
  })

  // res.status(200).json(responseData);

})

router.get('/auth/me', validateToken, async (req, res) => {
  jwt.verify(req.token, secretKey, (err, AuthData) => {
    if (err) {
      res.send({ result: 'invalid token' })
    }
    else {
      res.json({
        message: 'profile accessed',
        status: true,
        content: {
          data: {
            id: AuthData.newUser.id,
            name: AuthData.newUser.name,
            email: AuthData.newUser.email,
            created_at: AuthData.newUser.created_at
          }
        }
      })
    }
  })

})

function validateToken(req, res, next) {
  const berearHeader = req.headers['authorization']

  if (berearHeader != 'undefined') {
    const berear = berearHeader.split(" ")
    const token = berear[1]
    req.token = token
    next()
  }
  else {
    res.send({
      result: 'Token is not Valid'
    })
  }
}

//community
router.post('/community', async (req, res) => {
  const { name } = req.body;

  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'Name is required and must be at least 2 characters long.' });
  }

  const slug = name
  const ownerId = uuidv4()

  const newCommunity = new community({
    name, slug, ownerId
  })

  const result = await newCommunity.save()
  const responseData = {
    "status": true,
    "content": {
      "data": {
        result
      }
    }
  }
  res.status(201).json({ responseData })
})

router.get('/community', async (req, res) => {
  const result = await community.find({})
  const responseData = {
    status: true,
    content: {
      data: {
        result
      }
    }
  };
  res.status(201).json(responseData);
})


router.get('/community/:id/:members', async (req, res) => {
  const { id, members } = req.params
  console.log(id, members)
  const result = await community.find({ _id: id })
  if (!id) {
    res.json({ message: 'id not found' })

  }
  console.log("result", result)
  const responseData = {
    status: true,
    content: {
      data: {
        result
      }
    }
  };
  res.status(201).json(responseData);
})

// router.get('/community/me/owner', async (req, res) => {

// })
// router.get('/community/me/member', async (req, res) => {

// })


//member
router.post('/member', async (req, res) => {
  const { communityId , user , role } = req.body;

  const id = uuidv4()

  const newMember = new member({
    communityId, user, role
  })

  const result = await newMember.save()
  const responseData = {
    "status": true,
    "content": {
      "data": {
        result
      }
    }
  }
  res.status(201).json({ responseData })
})
// router.delete('/member/:id', async (req, res) => {

// })


module.exports = router
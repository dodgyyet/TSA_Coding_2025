import avatars from "../constants/avatars";
const samplePosts = [
  {
    $id: "1",
    title: "Geocaching",
    thumbnail:
      "https://cdn.pixabay.com/photo/2014/07/20/18/50/geocache-398019_1280.jpg",
    video:
      "https://cdn.pixabay.com/photo/2014/07/20/18/50/geocache-398019_1280.jpg",
    creator: { username: "John Ratter" },
    description:
      "Get ready to join a real world, outdoor treasure hunt with a community of millions. Use the https://Geocaching.com app to find a cleverly hidden “cache” containing a log book and a unique treasure left for you to keep. Be a part of a massive community by leaving a trinket in the stache for the next finder or by designing your own creative geocaches. ",
    avatar: avatars.B,
  },
  {
    $id: "2",
    title: "The Most Addicting Hobby",
    thumbnail:
      "https://cdn.pixabay.com/photo/2023/03/22/22/37/mavic-2-7870679_1280.jpg",
    video: "https://www.youtube.com/watch?v=ixYnzcZZu9g",
    creator: { username: "Charlie W" },
    description:
      "Drone flying gives you a whole new perspective of the world through aerial footage and allows you to feel like a professional pilot without needing advanced training. You can buy a mini drone for just $20 or a professional grade one for hundreds, so there is something for everyone. Follow along to this tutorial by UAV Coach which offers detailed drone controlling exercises aiming to take you from an absolute beginner to a pro pilot.",
    avatar: avatars.C,
  },
  {
    $id: "3",
    title: "Backyard mini golf",
    thumbnail:
      "https://cdn.pixabay.com/photo/2022/10/07/08/20/golf-7504480_1280.jpg",
    video:
      "https://cdn.pixabay.com/photo/2022/10/07/08/20/golf-7504480_1280.jpg",
    creator: { username: "Sammy S" },
    description:
      "Set up a backyard mini golf course and play a couple holes! Create makeshift obstacles in your backyard around a pathway with a small hole at the end. If you don’t have golfing equipment, just use any small ball around the house and a stick to perform your mini golfing activities. After your course is created, challenge your friends or family to a backyard minigolf outing.",
    avatar: avatars.S,
  },
  {
    $id: "4",
    title: "Trail-Finding",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg",
    video:
      "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg",
    creator: { username: "BobTheBackpacker" },
    description:
      "If life has been feeling dull lately, you likely need a change in scenery. Go running, biking, hiking or even just take a casual stroll outside. Use a website like AllTrails to identify trails and parks of any size and scenery near you. https://www.alltrails.com/?ref=header.",
    avatar: avatars.B,
  },
  {
    $id: "5",
    title: "9 Minute Full Body Circuit",
    thumbnail:
      "https://www.fitwirr.com/wp-content/uploads/2022/01/9-minute-full-body-circuit-training-workout-1.jpg",
    video:
      "https://www.fitwirr.com/wp-content/uploads/2022/01/9-minute-full-body-circuit-training-workout-1.jpg",
    creator: { username: "AliceFit" },
    description:
      "Looking for a quick challenge to get moving? Try out this 9 minute full-body circuit shown above. It's simple to follow and can be done anywhere for a boost in energy. Check out the workout created by fitwirr.com in more detail here: https://www.fitwirr.com/workout/full-body-circuit-training-workout/.",
    avatar: avatars.A,
  },
  {
    $id: "6",
    title: "Jumprope Challenge",
    thumbnail: require("../assets/thumbnails/jump-rope-challenge.png"),
    video: "https://www.youtube.com/watch?v=qNGJDb3pdc0",
    creator: { username: "Olivia V" },
    description:
      "Go jump rope for at least 5 minutes today. If you don’t know where to start, follow along to this easy tutorial to learn the basic tricks. Each day, jump rope for at least 5 minutes. At the end of your session, time yourself, skipping as long as possible with tripping up. Try to beat your time each day for 30 days then come back and message me your results!",
    avatar: avatars.O,
  },
  {
    $id: "7",
    title: "Shadowboxing Workout",
    thumbnail:
      "https://cdn.pixabay.com/photo/2017/01/16/15/28/boxer-1984344_1280.jpg",
    video:
      "https://cdn.pixabay.com/photo/2017/01/16/15/28/boxer-1984344_1280.jpg",
    creator: { username: "Robert H" },
    description:
      "Hit a shadow boxing workout. Shadow boxing isn’t just for aspiring professional fighters; it’s a fun workout to do with no equipment or training. Start slowly, turning your hips and moving your feet with each punch you throw at the air. As you improve, you can speed up and start throwing combinations!",
    avatar: avatars.R,
  },
  {
    $id: "8",
    title: "'Run' Your Own Empire",
    thumbnail:
      "https://cdn.pixabay.com/photo/2020/01/21/11/39/running-4782722_1280.jpg",
    video:
      "https://cdn.pixabay.com/photo/2020/01/21/11/39/running-4782722_1280.jpg",
    creator: { username: "Gina L" },
    description:
      "Go outside and capture territory in the Run An Empire app.  Build your own virtual empire by competing against others to capture real world places. Run, jog, or walk to capture territory from your neighbors to grow a prosperous empire. Download the app at https://www.runanempire.com.",
    avatar: avatars.G,
  },
];

export default samplePosts;

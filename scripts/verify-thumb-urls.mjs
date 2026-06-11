const urls = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Robot_mower_in_garden.jpg/640px-Robot_mower_in_garden.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Firefly_autonomous_lawn_mowers_at_a_golf_course.jpg/640px-Firefly_autonomous_lawn_mowers_at_a_golf_course.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Stihl_robot_mower.jpg/640px-Stihl_robot_mower.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Toadi_robotic_lawn_mower.jpg/640px-Toadi_robotic_lawn_mower.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Robotic_lawn_mower_on_roundabout%2C_Lannion.jpg/640px-Robotic_lawn_mower_on_roundabout%2C_Lannion.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/4/43/Lawn-mower-414249_640.jpg',
  'https://images.pexels.com/photos/2803523/pexels-photo-2803523.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
  'https://images.pexels.com/photos/589/pexels-photo-589.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
  'https://images.unsplash.com/photo-1451187583699-6da44d4f1b0c?w=640&h=360&fit=crop',
  'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=640&h=360&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=360&fit=crop',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=640&h=360&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=640&h=360&fit=crop',
];
for (const u of urls) {
  const r = await fetch(u, { method: 'HEAD', redirect: 'follow' });
  console.log(r.status, u.slice(0, 100));
}

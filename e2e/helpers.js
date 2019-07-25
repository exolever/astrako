module.exports = async () => {
  const avatars = $$('.exo-image-shape-circle');
  return Promise.all(await avatars.map(async (avatar) => {
    const size = await avatar.getSize();
    const location = await avatar.getLocation();
    return {
      height: size.height,
      weight: size.weight,
      x: location.x,
      y: location.y,
    };
  }));
};

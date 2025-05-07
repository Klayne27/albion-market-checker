function PanelImgDescription({ item, image }) {
  return (
    <>
      <div
        className={`w-21 h-21 relative ${"overflow-hidden bg-cover bg-center bg-no-repeat"}`}
        style={{
          backgroundImage: `url('${image}${item?.id}?quality=${item.quality}')`,
          backgroundSize: "107%",
        }}
      ></div>
      <div className="text-xs w-[378px] mb-[54px]">
        <span className="font-semibold text-xl">{item?.name}</span>
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </div>
    </>
  );
}

export default PanelImgDescription;

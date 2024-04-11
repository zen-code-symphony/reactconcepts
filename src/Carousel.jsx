import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="mt-2 flex h-[400px] items-center justify-around">
        <img
          src={images[active]}
          alt="animal hero"
          className="max-h-[400px] max-w-[45%]"
        />
        <div className="w-6/12">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={`${index === active ? "border-[#333] opacity-60" : ""} m-[15px] inline-block h-[100px] w-[100px] cursor-pointer rounded-[50%] border-2 border-solid border-[#333]`}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;

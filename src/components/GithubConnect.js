import React from "react";
import Portal from "../Portal";
import github from "../github-logo.svg";
import exclamation from "../exclamation.svg";

const connect_github = (scope) => {
  window.open(
    `${
      process.env.REACT_APP_BACKEND_URL
    }/connect_github?token=${localStorage.getItem(
      "token"
    )}&repos_scope=${scope}`
  );
};

class GithubConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleHide() {
    this.setState({ showModal: false });
  }

  render() {
    const modal = this.state.showModal ? (
      <Portal>
        <div
          className="modal fixed bg-black bg-opacity-50 w-full h-full top-0 left-0 flex items-center justify-center"
          onClick={this.handleHide}
        >
          <div className="w-3/12 rounded-lg overflow-hidden shadow-lg bg-white">
            <p>
              <button
                className="w-full height-auto hover:bg-purple-800"
                onClick={() => connect_github("public")}
              >
                <strong>Only public repositories</strong>
                <span className="text-sm">
                  <p>
                    Allow access to only public repositories you've contributed
                    to
                  </p>
                </span>
              </button>
            </p>
            <p>
              <button
                className="w-full height-auto hover:bg-purple-800"
                onClick={() => connect_github("full")}
              >
                <strong>All repositories</strong>
                <span className="text-sm">
                  <p>
                    Allow access to both public and private repositories you've
                    contributed to
                  </p>
                </span>
              </button>
            </p>
          </div>
        </div>
      </Portal>
    ) : null;

    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="inline-flex text-lg leading-6 font-medium text-gray-900">
            <img src={exclamation} alt="Warning" />
            &nbsp;Connect with GitHub
          </h3>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-xl text-sm leading-5 text-gray-500">
              <p>
                It is crucial to connect your GitHub account in order to compile
                your profile. We ask permission for reading all your
                repositories, private and public, and reading the organizations
                you are part of.
              </p>
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={this.handleShow}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                >
                  <img src={github} alt="GitHub logo" />
                  &nbsp;Connect with GitHub
                </button>
                {modal}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GithubConnect;

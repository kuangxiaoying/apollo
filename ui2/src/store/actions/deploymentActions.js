import {
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILURE,
  GET_SERVICES_STACK_REQUEST,
  GET_SERVICES_STACK_SUCCESS,
  GET_SERVICES_STACK_FAILURE,
  GET_ENV_STACK_REQUEST,
  GET_ENV_STACK_SUCCESS,
  GET_ENV_STACK_FAILURE,
  GET_ENV_REQUEST,
  GET_ENV_SUCCESS,
  GET_ENV_FAILURE,
  GET_DEPLOYABLE_VERSION_ID_REQUEST,
  GET_DEPLOYABLE_VERSION_ID_SUCCESS,
  GET_DEPLOYABLE_VERSION_ID_FAILURE,
  GET_DEPLOYABLE_VERSION_SHA_REQUEST,
  GET_DEPLOYABLE_VERSION_SHA_SUCCESS,
  GET_DEPLOYABLE_VERSION_SHA_FAILURE,
  GET_BRANCH_LATEST_VERSION_REQUEST,
  GET_BRANCH_LATEST_VERSION_SUCCESS,
  GET_BRANCH_LATEST_VERSION_FAILURE,
  GET_GROUPS_REQUEST,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAILURE,
  NEW_DEPLOYMENT_REQUEST,
  NEW_DEPLOYMENT_SUCCESS,
  NEW_DEPLOYMENT_FAILURE,
<<<<<<< HEAD
  GET_SERVICE_BY_ID_REQUEST,
  GET_SERVICE_BY_ID_SUCCESS,
  GET_SERVICE_BY_ID_FAILURE,
  SELECT_SERVICES,
=======
>>>>>>> 21fb84b4660cf6c09a558a25820ea90d74c9772e
  GET_ONGOING_DEPLOYMENT_REQUEST,
  GET_ONGOING_DEPLOYMENT_SUCCESS,
  GET_ONGOING_DEPLOYMENT_FAILURE,
  GET_LATEST_POD_REQUEST,
  GET_LATEST_POD_SUCCESS,
  GET_LATEST_POD_FAILURE,
<<<<<<< HEAD
  GET_LATEST_GROUP_POD_REQUEST,
  GET_LATEST_GROUP_POD_SUCCESS,
  GET_LATEST_GROUP_POD_FAILURE,
=======
  GET_LATEST_GROUP_POD_REQUEST, GET_LATEST_GROUP_POD_SUCCESS, GET_LATEST_GROUP_POD_FAILURE,
>>>>>>> 21fb84b4660cf6c09a558a25820ea90d74c9772e
} from '../actions';
import * as API from '../../api/api';
// import { historyBrowser } from '../../utils/history';
import { fetchAndStore } from '../../utils/cacheService';

export const getServices = () => {
  return async dispatch => {
    dispatch({
      type: GET_SERVICES_REQUEST,
    });
    try {
      const data = await fetchAndStore('services', API.getServices, 60 * 6);
      dispatch({
        type: GET_SERVICES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SERVICES_FAILURE,
        error,
      });
    }
  };
};

export const getServicesStacks = () => {
  return async dispatch => {
    dispatch({
      type: GET_SERVICES_STACK_REQUEST,
    });
    try {
      const data = await fetchAndStore('services-stacks', API.getServicesStacks, 60 * 6);
      dispatch({
        type: GET_SERVICES_STACK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SERVICES_STACK_FAILURE,
        error,
      });
    }
  };
};

export const getEnvironments = () => {
  return async dispatch => {
    dispatch({
      type: GET_ENV_REQUEST,
    });
    try {
      const data = await fetchAndStore('env', API.getEnvironments, 60 * 6);
      dispatch({
        type: GET_ENV_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ENV_FAILURE,
        error,
      });
    }
  };
};

export const getEnvironmentsStacks = () => {
  return async dispatch => {
    dispatch({
      type: GET_ENV_STACK_REQUEST,
    });
    try {
      const data = await fetchAndStore('env-stacks', API.getEnvironmentsStacks, 60 * 6);
      dispatch({
        type: GET_ENV_STACK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ENV_STACK_FAILURE,
        error,
      });
    }
  };
};

export const getServiceById = serviceId => {
  return async dispatch => {
    dispatch({
      type: GET_SERVICE_BY_ID_REQUEST,
    });
    try {
      const data = await fetchAndStore(`service-${serviceId}`, API.getServiceById, 60 * 6, serviceId);
      dispatch({
        type: GET_SERVICE_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SERVICE_BY_ID_FAILURE,
        error,
      });
    }
  };
};

export const getDeployableVersionById = servicesId => {
  return async dispatch => {
    dispatch({
      type: GET_DEPLOYABLE_VERSION_ID_REQUEST,
    });
    try {
      const data = await API.getDeployableVersionById(servicesId);
      dispatch({
        type: GET_DEPLOYABLE_VERSION_ID_SUCCESS,
        payload: data,
        // payload: depVersionMock,
      });
    } catch (error) {
      dispatch({
        type: GET_DEPLOYABLE_VERSION_ID_FAILURE,
        error,
      });
    }
  };
};

export const getDeployableVersionBySha = gitCommitSha => {
  return async dispatch => {
    dispatch({
      type: GET_DEPLOYABLE_VERSION_SHA_REQUEST,
    });
    try {
      const data = await API.getDeployableVersionBySha(gitCommitSha);
      dispatch({
        type: GET_DEPLOYABLE_VERSION_SHA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_DEPLOYABLE_VERSION_SHA_FAILURE,
        error,
      });
    }
  };
};

//Supply one of the service deployable versions ID's
export const getLastCommitFromBranch = (branchName, deployableVersionId) => {
  return async dispatch => {
    dispatch({
      type: GET_BRANCH_LATEST_VERSION_REQUEST,
    });
    try {
      const data = await API.getLastCommitFromBranch(branchName, deployableVersionId);
      dispatch({
        type: GET_BRANCH_LATEST_VERSION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BRANCH_LATEST_VERSION_FAILURE,
        error,
      });
    }
  };
};

export const getGroups = (environmentId, serviceId) => {
  return async dispatch => {
    dispatch({
      type: GET_GROUPS_REQUEST,
    });
    try {
      const data = await API.getGroups(environmentId, serviceId);
      dispatch({
        type: GET_GROUPS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_GROUPS_FAILURE,
        error,
      });
    }
  };
};

export const deploy = newDeployment => {
  return async dispatch => {
    dispatch({
      type: NEW_DEPLOYMENT_REQUEST,
    });
    try {
      const data = await API.deploy(newDeployment);
      // historyBrowser.push({
      //   pathname: '/ongoingDeployment',
      // });
      dispatch({
        type: NEW_DEPLOYMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_DEPLOYMENT_FAILURE,
        error,
      });
    }
  };
};

<<<<<<< HEAD
export const selectServices = services => {
  return dispatch => {
    dispatch({
      type: SELECT_SERVICES,
      payload: services,
    });
  };
};

=======
>>>>>>> 21fb84b4660cf6c09a558a25820ea90d74c9772e
export const getOngoingDeployments = () => {
  return async dispatch => {
    dispatch({
      type: GET_ONGOING_DEPLOYMENT_REQUEST,
    });
    try {
      const data = await API.getOngoingDeployments();
      dispatch({
        type: GET_ONGOING_DEPLOYMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ONGOING_DEPLOYMENT_FAILURE,
        error,
      });
    }
  };
};

export const getLatestCreatedPod = (environmentId, serviceId) => {
  return async dispatch => {
    dispatch({
      type: GET_LATEST_POD_REQUEST,
    });
    try {
      const data = await API.getLatestCreatedPod(environmentId, serviceId);
      dispatch({
        type: GET_LATEST_POD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LATEST_POD_FAILURE,
        error,
      });
    }
  };
};

export const getLatestCreatedGroupPod = (environmentId, serviceId, groupName) => {
  return async dispatch => {
    dispatch({
      type: GET_LATEST_GROUP_POD_REQUEST,
    });
    try {
      const data = await API.getLatestCreatedGroupPod(environmentId, serviceId, groupName);
      dispatch({
        type: GET_LATEST_GROUP_POD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LATEST_GROUP_POD_FAILURE,
        error,
      });
    }
  };
};
<<<<<<< HEAD

// export const selectService = () => {
//     return async dispatch => {
//         dispatch({
//             type: GET_SERVICES_REQUEST,
//         });
//         try {
//             const data = await API.getServices();
//             dispatch({
//                 type: GET_SERVICES_SUCCESS,
//                 payload: data,
//                 // payload: servicesMock,
//             });
//         } catch (error) {
//             dispatch({
//                 type: GET_SERVICES_FAILURE,
//                 error,
//             });
//         }
//     };
// };
=======
>>>>>>> 21fb84b4660cf6c09a558a25820ea90d74c9772e

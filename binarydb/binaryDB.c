#include <node_api.h>

#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#include "binaryDB.h"

static int TEMPLATE_RESOLVER_LEN = strlen("/templateResolver?");

void removeSubstring(char *s,const char *toremove)
{
    int i = strncmp(s, toremove, strlen(s));
    memmove(s + i, s + i + strlen(toremove) + 1, strlen(s) -i - strlen(toremove));
    //printf("-- %d -- %s -- %s -- \n", i, s + i + strlen(toremove) + 1, toremove);
}

static napi_value
splitHash(napi_env env, napi_callback_info info) {

  // for this function we pass 1 argument
  // so this is how we get an argument
  size_t argc = 1;
  napi_value argv[1];
  NAPI_CALL(env, napi_get_cb_info(env, info, &argc, argv, NULL, NULL));

  char buf[1024];
  size_t res;
  NAPI_CALL(env, napi_get_value_string_utf8(env, argv[0], buf, sizeof(buf), &res));

  int i, len = strlen(buf);
  for (i = 0; i < len; i++) {
    buf[i] = tolower(buf[i]);
  }

  char* hashStart = strstr(buf, "hash=");
  if (hashStart) {
      char* hashKey = strtok(hashStart, "&");

      napi_value result;
      NAPI_CALL(env, napi_create_object(env, &result));

      // make a copy
      char *hashKeyCopy = strdup(hashKey);

      napi_value hash;
      NAPI_CALL(env, napi_create_string_utf8(env, hashKey+5, NAPI_AUTO_LENGTH, &hash));

      napi_value url;
      for (i=0; i< len-TEMPLATE_RESOLVER_LEN; i++) {
          buf[i] = buf[i+TEMPLATE_RESOLVER_LEN];
      }
      for (i=len-TEMPLATE_RESOLVER_LEN; i< len; i++) {
        buf[i] = '\0';
      }
      removeSubstring(buf, hashKeyCopy);
      free(hashKeyCopy);

      NAPI_CALL(env, napi_create_string_utf8(env, buf, NAPI_AUTO_LENGTH, &url));

      NAPI_CALL(env, napi_set_named_property(env, result, "refURL", url));
      NAPI_CALL(env, napi_set_named_property(env, result, "hash", hash));

      return result;
  }
  return NULL;
}

static napi_value
getCacheItem(napi_env env, napi_callback_info info) {

  char arr[17] = "hello crewl world";

  size_t argc;
  napi_value argv;
  napi_value this;
  void *data;
  napi_get_cb_info(env, info, &argc, &argv, &this, &data);

  napi_value result;
  NAPI_CALL(env, napi_create_string_utf8(env, arr, strlen(arr), &result));

  return result;
}

void *export_function_by_name(napi_env env, const char* utf8name, napi_callback cb, napi_value *result) {

    napi_value exported_function;
    NAPI_CALL(env, napi_create_function(env,
                                      utf8name,
                                      NAPI_AUTO_LENGTH,
                                      cb,
                                      NULL,
                                      &exported_function));

    NAPI_CALL(env, napi_set_named_property(env,
                                         *result,
                                         utf8name,
                                         exported_function));

    return NULL;
}

napi_value create_binaryDB(napi_env env) {

  napi_value result;
  NAPI_CALL(env, napi_create_object(env, &result));

  export_function_by_name(env, "splitHash", splitHash, &result);

  export_function_by_name(env, "getCacheItem", getCacheItem, &result);

  return result;
}

NAPI_MODULE_INIT() {
    return create_binaryDB(env);
}

"use strict";

define("nodes/components/driver-ionoscloud/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICAge3shLS0gVGhpcyBsaW5lIHNob3dzIHRoZSBkcml2ZXIgdGl0bGUgd2hpY2ggeW91IGRvbid0IGhhdmUgdG8gY2hhbmdlIGl0IC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgbWItMjAiPjxzcGFuPnt7ZHJpdmVyT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbSB0aXRsZT0iQWNjb3VudCBBY2Nlc3MiCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbD0iQVBJIGVuZHBvaW50IGFuZCBjcmVkZW50aWFscy4iCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZEFsbD1leHBhbmRBbGwKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZE9uSW5pdD10cnVlCiAgICB9fQogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlVzZXJuYW1lLiBGYWxsYmFjayB0byBUb2tlbiBpZiBub3Qgc2V0LjwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy51c2VybmFtZQogICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0iWW91ciBJT05PUyB1c2VybmFtZSIKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+UGFzc3dvcmQuIEZhbGxiYWNrIHRvIFRva2VuIGlmIG5vdCBzZXQuPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdHlwZT0icGFzc3dvcmQiCiAgICAgICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5wYXNzd29yZAogICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0iWW91ciBJT05PUyBwYXNzd29yZCIKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5BUEkgVG9rZW4gKE92ZXJyaWRlcyBVc2VybmFtZSAmIFBhc3N3b3JkKTwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InBhc3N3b3JkIgogICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnRva2VuCiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9IllvdXIgSU9OT1MgdG9rZW4iCiAgICAgICAgICB9fQogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPllvdSBjYW4gdXNlIDxhIGhyZWY9Imh0dHBzOi8vZG9jcy5pb25vcy5jb20vY2xpLWlvbm9zY3RsL3N1YmNvbW1hbmRzL2F1dGhlbnRpY2F0aW9uL3Rva2VuLWdlbmVyYXRlIiB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIj5pb25vc2N0bDwvYT4gdG8gZ2VuZXJhdGUgYW4gQVBJIHRva2VuLjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTIiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkFQSSBFbmRwb2ludDwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuZW5kcG9pbnQKICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0iaHR0cHM6Ly9hcGkuaW9ub3MuY29tL2Nsb3VkYXBpL3Y2IgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5PcHRpb25hbDwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KCiAgICB7eyNhY2NvcmRpb24tbGlzdC1pdGVtIHRpdGxlPSJJbnN0YW5jZSBPcHRpb25zIgogICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw9IlZNIHNldHRpbmdzLiBTZXQgdXAgeW91ciBjb3JlIGNvdW50ICYgcmFtLiIKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kQWxsPWV4cGFuZEFsbAogICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kT25Jbml0PWZhbHNlCiAgICB9fQogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkxvY2F0aW9uPC9sYWJlbD4KICAgICAgICAgICAge3tuZXctc2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PWxvY2F0aW9uT3B0aW9ucwogICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uTGFiZWxQYXRoPSduYW1lJwogICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uVmFsdWVQYXRoPSd2YWx1ZScKICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5sb2NhdGlvbgogICAgICAgICAgICB9fQogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlNlcnZlciBUeXBlPC9sYWJlbD4KICAgICAgICAgICAge3tuZXctc2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXNlcnZlclR5cGVPcHRpb25zCiAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25MYWJlbFBhdGg9J25hbWUnCiAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25WYWx1ZVBhdGg9J3ZhbHVlJwogICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnNlcnZlclR5cGUKICAgICAgICAgICAgfX0KICAgICAgICA8L2Rpdj4KICAgICAgICB7eyNpZiAoZXEgY29uZmlnLnNlcnZlclR5cGUgIkNVQkUiKSB9fQogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNVQkUgU2VydmVyIFRlbXBsYXRlPC9sYWJlbD4KICAgICAgICAgIHt7bmV3LXNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9Y3ViZVNlcnZlclRlbXBsYXRlT3B0aW9ucwogICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkxhYmVsUGF0aD0nbmFtZScKICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25WYWx1ZVBhdGg9J3ZhbHVlJwogICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy50ZW1wbGF0ZQogICAgICAgICAgfX0KICAgICAgICA8L2Rpdj4KICAgICAgICB7e2Vsc2V9fQogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlNlcnZlciBab25lPC9sYWJlbD4KICAgICAgICAgIHt7bmV3LXNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9em9uZU9wdGlvbnMKICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25MYWJlbFBhdGg9J25hbWUnCiAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uVmFsdWVQYXRoPSd2YWx1ZScKICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuc2VydmVyWm9uZQogICAgICAgICAgfX0KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0zIj4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5Wb2x1bWUgWm9uZTwvbGFiZWw+CiAgICAgICAgICB7e25ldy1zZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXpvbmVPcHRpb25zCiAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uTGFiZWxQYXRoPSduYW1lJwogICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblZhbHVlUGF0aD0ndmFsdWUnCiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnZvbHVtZVpvbmUKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgICAge3svaWZ9fQogICAgICA8L2Rpdj4KCiAgICAgIHt7I2lmIChlcSBjb25maWcuc2VydmVyVHlwZSAiRU5URVJQUklTRSIpIH19CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMyI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Q1BVIEZhbWlseTwvbGFiZWw+CiAgICAgICAgICAgIHt7bmV3LXNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD1jcHVPcHRpb25zCiAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25MYWJlbFBhdGg9J25hbWUnCiAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25WYWx1ZVBhdGg9J3ZhbHVlJwogICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLmNwdUZhbWlseQogICAgICAgICAgICB9fQogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNQVSBjb3JlIGNvdW50PC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQtaW50ZWdlcgogICAgICAgICAgICB2YWx1ZT1jb25maWcuY29yZXMKICAgICAgICAgICAgcGxhY2Vob2xkZXI9NAogICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlJBTTwvbGFiZWw+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CiAgICAgICAgICAgIHt7aW5wdXQtaW50ZWdlciBtaW49MjU2CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcucmFtCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgIH19CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPk1pQjwvZGl2PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+TXVzdCBiZSBhIG11bHRpcGxlIG9mIDI1NjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+U3RvcmdlIFNpemU8L2xhYmVsPgogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAgICB7e2lucHV0LWludGVnZXIgdmFsdWU9Y29uZmlnLmRpc2tTaXplCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgIH19CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPkdCPC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5TdG9yYWdlIFR5cGU8L2xhYmVsPgogICAgICAgICAge3tuZXctc2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD1zdG9yYWdlVHlwZU9wdGlvbnMKICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25MYWJlbFBhdGg9J25hbWUnCiAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uVmFsdWVQYXRoPSd2YWx1ZScKICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuZGlza1R5cGUKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICB7e2Vsc2V9fQogICAgICB7ey9pZn19CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+SW1hZ2UgQWxpYXMgb3IgSUQ8L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IgogICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuaW1hZ2UKICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9InVidW50dToyMC4wNCIKICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5Zb3UgY2FuIHVzZSA8YSBocmVmPSJodHRwczovL2RvY3MuaW9ub3MuY29tL2NsaS1pb25vc2N0bCIgdGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9vcGVuZXIgbm9yZWZlcnJlciI+aW9ub3NjdGwgaW1hZ2UgbGlzdCBbLUYgbmFtZT1vcGVyYXRpbmdTeXN0ZW1dPC9hPjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JbWFnZSBQYXNzd29yZDwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InBhc3N3b3JkIgogICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuaW1hZ2VQYXNzd29yZAogICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0iYWJjZGUxMjM0NSIKICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5DYW4gYmUgdXNlZCB0byBjb25uZWN0IHRvIHRoZSBWTTwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTIiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNsb3VkIGluaXQgY29uZmlndXJhdGlvbi48L2xhYmVsPgogICAgICAgICAgPHRleHRhcmVhIGlkPSJlZGl0b3IiIHZhbHVlPXt7Y29uZmlnLnVzZXJEYXRhfX0gb25jaGFuZ2U9e3thY3Rpb24gKG11dCBjb25maWcudXNlckRhdGEpIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19IHJvd3M9IjMiIHN0eWxlPSJ3aWR0aDogMTAwJTsgcmVzaXplOiB2ZXJ0aWNhbCI+PC90ZXh0YXJlYT4KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5PcHRpb25hbC4gPGEgaHJlZj0iaHR0cHM6Ly9jbG91ZGluaXQucmVhZHRoZWRvY3MuaW8vZW4vbGF0ZXN0L3RvcGljcy9leGFtcGxlcy5odG1sIiB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIj5DbG91ZC1pbml0IERvY3VtZW50YXRpb248L2E+LjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KCiAgICB7eyNhY2NvcmRpb24tbGlzdC1pdGVtIHRpdGxlPSJOZXR3b3JrIE9wdGlvbnMiCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbD0iU2V0IHVwIHlvdXIgdGFyZ2V0IERhdGFjZW50ZXIsIExBTiwgYW5kIG90aGVyIG5ldHdvcmsgc2V0dGluZ3MgaGVyZS4iCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZEFsbD1leHBhbmRBbGwKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZE9uSW5pdD1mYWxzZQogICAgfX0KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5TU0ggVXNlcjwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5zc2hVc2VyCiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+T3B0aW9uYWwuIFVzZXIgdG8gY29ubmVjdCB0byB2aWEgU1NILjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5TZW5kIFNTSCBpbiB1c2VyIGRhdGEuPC9sYWJlbD4KICAgICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY2hlY2siIHN0eWxlPSIiPgogICAgICAgICAgICB7e2lucHV0IHR5cGU9ImNoZWNrYm94IgogICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9Y29uZmlnLnNzaEluVXNlckRhdGEKICAgICAgICAgICAgfX0KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNoZWNrLWxhYmVsIiBmb3I9InNzaEluVXNlckRhdGFDaGVja2JveCI+CiAgICAgICAgICAgICAgU2VuZCBTU0ggaW4gdXNlciBkYXRhLgogICAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+U2hvdWxkIHRoZSBkcml2ZXIgb25seSBhZGQgdGhlIFNTSCBpbmZvIGluIHRoZSB1c2VyIGRhdGE/IChyZXF1aXJlZCBmb3IgY3VzdG9tIGltYWdlcykuPC9wPgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icm93Ij4ge3shLS0gRGF0YWNlbnRlciBjb25maWcgcm93LS19fQogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPklPTk9TIERhdGFjZW50ZXIgSUQ8L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IgogICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuZGF0YWNlbnRlcklkCiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+T3B0aW9uYWwsIFVVSUQtNCBmb3JtYXQuIElmIHlvdSB3YW50IHRvIHVzZSBhbiBleGlzdGluZyBJT05PUyBEYXRhY2VudGVyIHRvIGhvc3QgdGhpcyBWTSwgeW91IGNhbiBwcm92aWRlIGl0cyBJRCBoZXJlLjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JT05PUyBEYXRhY2VudGVyIE5hbWU8L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IgogICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuZGF0YWNlbnRlck5hbWUKICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5TdHJpbmcuIElmIHlvdSB3YW50IHRvIHVzZSBhbiBleGlzdGluZyBJT05PUyBEYXRhY2VudGVyIHRvIGhvc3QgdGhpcyBWTSwgeW91IGNhbiBjaGFuZ2UgdGhlIG5hbWUgaGVyZS4gUGxlYXNlIG5vdGUgdGhhdCBpZiB0aGUgSUQgaXMgc2V0IGl0IHdpbGwgdGhlIHByaW9yaXRpemVkLjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+ICB7eyEtLSBMQU4gY29uZmlnIHJvdy0tfX0KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JT05PUyBMYW4gSUQ8L2xhYmVsPgogICAgICAgICAgPCEtLSBUT0RPOiBUaGlzLCBpZiBoYXMgaW5wdXQsIHNob3VsZCBtYWtlIERhdGFjZW50ZXJJRCBhIHJlcXVpcmVkIGlucHV0IC0tPgogICAgICAgICAge3tpbnB1dC1pbnRlZ2VyCiAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5sYW5JZAogICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPk9wdGlvbmFsLCBpbnRlZ2VyLiBUaGUgTEFOIHRoZSBWTSB3aWxsIGF0dGFjaCB0by4gSWYgYmxhbmssIGEgZGVmYXVsdCBMQU4gd2lsbCBiZSBjcmVhdGVkLiBPdmVycmlkZXMgIlByaXZhdGUgTEFOIiBzZXR0aW5nLjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JT05PUyBMYW4gTmFtZTwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5sYW5OYW1lCiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+U3RyaW5nLiBJZiB5b3Ugd2FudCB0byB1c2UgYW4gZXhpc3RpbmcgSU9OT1MgTEFOLCB5b3UgY2FuIGNoYW5nZSB0aGUgbmFtZSBoZXJlLiBQbGVhc2Ugbm90ZSB0aGF0IGlmIHRoZSBJRCBpcyBzZXQgaXQgd2lsbCB0aGUgcHJpb3JpdGl6ZWQuPC9wPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlByaXZhdGUgTEFOPC9sYWJlbD4KICAgICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY2hlY2siIHN0eWxlPSIiPgogICAgICAgICAgICB7e2lucHV0IHR5cGU9ImNoZWNrYm94IgogICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9Y29uZmlnLnByaXZhdGVMYW4KICAgICAgICAgICAgfX0KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNoZWNrLWxhYmVsIiBmb3I9InByaXZhdGVMYW5DaGVja2JveCI+CiAgICAgICAgICAgICAgTWFrZSBEZWZhdWx0IExBTiBQcml2YXRlCiAgICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5JZiB0aGUgZGVmYXVsdCBMQU4gZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBhIHByaXZhdGUgTEFOPC9wPgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icm93Ij4gIHt7IS0tIE5JQyBjb25maWcgcm93LS19fQogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPklPTk9TIE5JQyBESENQPC9sYWJlbD4KICAgICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY2hlY2siIHN0eWxlPSIiPgogICAgICAgICAgICB7e2lucHV0IHR5cGU9ImNoZWNrYm94IgogICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9Y29uZmlnLm5pY0RoY3AKICAgICAgICAgICAgfX0KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNoZWNrLWxhYmVsIiBmb3I9Im5pY0RoY3BDaGVja2JveCI+CiAgICAgICAgICAgICAgTklDIERIQ1AKICAgICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlNldCB3aGV0aGVyIHRoZSBjcmVhdGVkIE5JQyBzaG91bGQgaGF2ZSBkaGNwIHNldCBvbiBvciBvZmY8L3A+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiBmb3JtLWdyb3VwIj4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5OSUMgSVBzPC9sYWJlbD48YnIvPgoKICAgICAgICAgIHt7I2VhY2ggY29uZmlnLm5pY0lwcyBhcyB8SXAgaW5kZXh8fX0KICAgICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICAgIHt7aW5wdXQgaWQ9KGNvbmNhdCAiSXAtIiBpbmRleCkgdmFsdWU9SXAgcGxhY2Vob2xkZXI9IklQIiBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wgbWItMiBhdXRvd2lkdGggY29sIiByZWFkb25seT10cnVlfX0KICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG4gYnRuLW91dGxpbmUtZGFuZ2VyIGJ0bi1zbSBjb2wgc3Bhbi0yIiB7e2FjdGlvbiAiZGVsZXRlTmljSXAiIGluZGV4fX0+LTwvYnV0dG9uPgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICAgIHt7aW5wdXQgaWQ9Im5ld0lwIiB2YWx1ZT0obXV0IG5ld0lwKSBwbGFjZWhvbGRlcj0iTmV3IElQIiBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wgbWItMiBhdXRvd2lkdGggY29sIn19CiAgICAgICAgICAgIDxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRuIGJ0bi1vdXRsaW5lLWRhbmdlciBidG4tc20gY29sIHNwYW4tMiIge3thY3Rpb24gImFkZE5pY0lwIiBuZXdJcH19Pis8L2J1dHRvbj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPk9wdGlvbmFsLiBJUEJsb2NrIHJlc2VydmVkIElQcy4gSWYgbm90IHNldCwgdGhlIGRyaXZlciB3aWxsIHJlc2VydmUgYW4gSVBCbG9jayBhdXRvbWF0aWNhbGx5IG9yIGxldCB0aGUgQVBJIHNldCBhIHByaXZhdGUgSVAgaWYgdGhlIExBTiBpcyBwcml2YXRlPC9wPgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5XYWl0IGZvciBOSUMgSVAgY2hhbmdlPC9sYWJlbD4KICAgICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tY2hlY2siIHN0eWxlPSIiPgogICAgICAgICAgICB7e2lucHV0IHR5cGU9ImNoZWNrYm94IgogICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9Y29uZmlnLndhaXRGb3JJcENoYW5nZQogICAgICAgICAgICB9fQogICAgICAgICAgICA8bGFiZWwgY2xhc3M9ImZvcm0tY2hlY2stbGFiZWwiIGZvcj0id2FpdEZvcklwQ2hhbmdlQ2hlY2tib3giPgogICAgICAgICAgICAgIFdhaXQgZm9yIE5JQyBJUCBjaGFuZ2UKICAgICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlNob3VsZCB0aGUgZHJpdmVyIHdhaXQgZm9yIHRoZSBOSUMgSVAgdG8gYmUgc2V0IGJ5IGV4dGVybmFsIHNvdXJjZXM/PC9wPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPldhaXQgZm9yIElQIGNoYW5nZSB0aW1lb3V0PC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQtaW50ZWdlcgogICAgICAgICAgICB2YWx1ZT1jb25maWcud2FpdEZvcklwQ2hhbmdlVGltZW91dAogICAgICAgICAgICBwbGFjZWhvbGRlcj02MDAKICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+IHt7IS0tIE5BVCBjb25maWcgcm93LS19fQogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPklPTk9TIE5hdCBHYXRld2F5IElEPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLm5hdElkCiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+T3B0aW9uYWwsIFVVSUQtNCBmb3JtYXQuIFVzZSBhIHByZWNvbmZpZ3VyZWQgTkFUIEdhdGV3YXkuIERhdGFjZW50ZXIgSUQgYW5kIFByaXZhdGUgTEFOIHJlcXVpcmVkLiBPdmVycmlkZXMgTkFUIENvbmZpZyBiZWxvdzwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JT05PUyBOYXQgR2F0ZXdheSBOYW1lPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLm5hdE5hbWUKICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5TdHJpbmcuIElmIHRoZSAiQ3JlYXRlIE5BVCIgY2hlY2tib3ggaXMgY2hlY2tlZCwgd2lsbCB0cnkgY3JlYXRpbmcgYSBOQVQgd2l0aCB0aGlzIG5hbWUuIElmIG9uZSBhbHJlYWR5IGV4aXN0cywgd2lsbCB1c2UgdGhlIGV4aXN0aW5nIE5BVC48L3A+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Q3JlYXRlIGEgY29uZmlndXJhYmxlIE5BVDwvbGFiZWw+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJmb3JtLWNoZWNrIiBzdHlsZT0iIj4KICAgICAgICAgICAge3tpbnB1dCB0eXBlPSJjaGVja2JveCIKICAgICAgICAgICAgICAgICAgICBjaGVja2VkPWNvbmZpZy5jcmVhdGVOYXQKICAgICAgICAgICAgfX0KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNoZWNrLWxhYmVsIiBmb3I9ImNyZWF0ZU5hdENoZWNrYm94Ij4KICAgICAgICAgICAgICBDcmVhdGUgTkFUCiAgICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5SZXF1aXJlcyBwcml2YXRlIExBTi4gWW91IGNhbiBvdmVycmlkZSBzZXR0aW5ncyBvZiB0aGlzIE5BVCB1c2luZyB0aGUgZm9ybSBiZWxvdyA8YSBocmVmPSIjIiB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIj5TZWUgb3BlbiBwb3J0cyBoZXJlPC9hPi4gTXVzdCBzZXQgZ2F0ZXdheSBJUCBhcyBkZWZhdWx0IHJvdXRlIHZpYSBjbG91ZCBjb25maWcsIGRlZmF1bHQ6IDEwLjAuMC4xPC9wPgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPCEtLSBDdXN0b20gTkFUIEdhdGV3YXkgc2V0dGluZ3MgIC0tPgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYgZm9ybS1ncm91cCI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkN1c3RvbSBOQVQ6IG1hcCBMQU5zIHRvIEdhdGV3YXkgSVBzPC9sYWJlbD4KICAgICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICAgICAge3tpbnB1dCB2YWx1ZT1uZXdMYW5JZCBwbGFjZWhvbGRlcj0iTGFuIElEIiBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wgbWItMiBjb2wgc3Bhbi01IGF1dG93aWR0aCJ9fQogICAgICAgICAgICAgIHt7aW5wdXQgdmFsdWU9Z2F0ZXdheUlwIHBsYWNlaG9sZGVyPSJHYXRld2F5IElQIiBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wgbWItMiBjb2wgc3Bhbi01IGF1dG93aWR0aCJ9fQogICAgICAgICAgICAgIDxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbSBjb2wgc3Bhbi0yIiB7e2FjdGlvbiAiYWRkR2F0ZXdheUlwIiBuZXdMYW5JZCBnYXRld2F5SXB9fT5BZGQ8L2J1dHRvbj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIHt7I2VhY2ggbGFucyBhcyB8bGFufH19CiAgICAgICAgICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5MYW4ge3tsYW4uaWR9fSBHYXRld2F5IElQczwvbGFiZWw+PGJyLz4KICAgICAgICAgICAgICAgIHt7I2VhY2ggbGFuLmdhdGV3YXlJcHMgYXMgfGdhdGV3YXlJcCBpbmRleHx9fQogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgICAgICAgICAgIHt7aW5wdXQgaWQ9KGNvbmNhdCAiZ2F0ZXdheUlwLSIgbGFuLmlkICItIiBpbmRleCkgdmFsdWU9KG11dCBnYXRld2F5SXApIHBsYWNlaG9sZGVyPSJHYXRld2F5IElQIiBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wgY29sIHNwYW4tMTEgYXV0b3dpZHRoIiByZWFkb25seT10cnVlfX0KICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0biBidG4tb3V0bGluZS1kYW5nZXIgYnRuLXNtIGNvbCBzcGFuLTEiIHt7YWN0aW9uICJkZWxldGVHYXRld2F5SXAiIGxhbiBpbmRleH19Pi08L2J1dHRvbj4KICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICB7ey9lYWNofX0KICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAge3svZWFjaH19CiAgICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5PcHRpb25hbC4gTWFwcyBMYW4gSURzIHRvIGEgc3BlY2lmaWMgR2F0ZXdheSBJUC4gR2F0ZXdheSBJUCBtdXN0IGJlIHNldCBtYW51YWxseSBhcyBkZWZhdWx0IHJvdXRlLjwvcD4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgoKICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02IGZvcm0tZ3JvdXAiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkN1c3RvbSBOQVQ6IFB1YmxpYyBJUHM8L2xhYmVsPjxici8+CgogICAgICAgICAge3sjZWFjaCBjb25maWcubmF0UHVibGljSXBzIGFzIHxwdWJsaWNJcCBpbmRleHx9fQogICAgICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICAgICAge3tpbnB1dCBpZD0oY29uY2F0ICJwdWJsaWNJcC0iIGluZGV4KSB2YWx1ZT1wdWJsaWNJcCBwbGFjZWhvbGRlcj0iUHVibGljIElQIiBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wgbWItMiBhdXRvd2lkdGggY29sIiByZWFkb25seT10cnVlfX0KICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG4gYnRuLW91dGxpbmUtZGFuZ2VyIGJ0bi1zbSBjb2wgc3Bhbi0yIiB7e2FjdGlvbiAiZGVsZXRlUHVibGljSXAiIGluZGV4fX0+LTwvYnV0dG9uPgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICAgIHt7aW5wdXQgaWQ9Im5ld1B1YmxpY0lwIiB2YWx1ZT0obXV0IG5ld1B1YmxpY0lwKSBwbGFjZWhvbGRlcj0iTmV3IFB1YmxpYyBJUCIgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIG1iLTIgYXV0b3dpZHRoIGNvbCJ9fQogICAgICAgICAgICA8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0biBidG4tb3V0bGluZS1kYW5nZXIgYnRuLXNtIGNvbCBzcGFuLTIiIHt7YWN0aW9uICJhZGRQdWJsaWNJcCIgbmV3UHVibGljSXB9fT4rPC9idXR0b24+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5PcHRpb25hbC4gSVBCbG9jayByZXNlcnZlZCBJUHMuIElmIG5vdCBzZXQsIHRoZSBkcml2ZXIgd2lsbCByZXNlcnZlIGFuIElQQmxvY2sgYXV0b21hdGljYWxseTwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KCiAgICB7eyEtLSBUaGlzIGZvbGxvd2luZyBjb250YWlucyB0aGUgTmFtZSwgTGFiZWxzIGFuZCBFbmdpbmUgT3B0aW9ucyBmaWVsZHMgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+PHNwYW4+e3t0ZW1wbGF0ZU9wdGlvbnNUaXRsZX19PC9zcGFuPjwvZGl2PgoKICAgIHt7Zm9ybS1uYW1lLWRlc2NyaXB0aW9uCiAgICAgIG1vZGVsPW1vZGVsCiAgICAgIG5hbWVSZXF1aXJlZD10cnVlCiAgICB9fQoKICAgIHt7Zm9ybS11c2VyLWxhYmVscwogICAgICBpbml0aWFsTGFiZWxzPWxhYmVsUmVzb3VyY2UubGFiZWxzCiAgICAgIHNldExhYmVscz0oYWN0aW9uICdzZXRMYWJlbHMnKQogICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgfX0KCiAgICB7e2Zvcm0tZW5naW5lLW9wdHMKICAgICAgbWFjaGluZT1tb2RlbAogICAgICBzaG93RW5naW5lVXJsPXNob3dFbmdpbmVVcmwKICAgIH19CiAge3svYWNjb3JkaW9uLWxpc3R9fQoKICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyBlcnJvcnMgcHJvZHVjZWQgYnkgdmFsaWRhdGUoKSBpbiB0aGUgY29tcG9uZW50IC0tfX0KICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CgogIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIHRoZSBDcmVhdGUgYW5kIENhbmNlbCBidXR0b25zIC0tfX0KICB7e3NhdmUtY2FuY2VsCiAgICBzYXZlPShhY3Rpb24gInNhdmUiKQogICAgY2FuY2VsPShhY3Rpb24gImNhbmNlbCIpCiAgICBlZGl0aW5nPWVkaXRpbmcKICB9fQo8L3NlY3Rpb24+";
  var computed = Ember.computed;
  var get = Ember.get;
  var set = Ember.set;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  var defaultRadix = 10;
  var defaultBase = 1024;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'ionoscloud',
    config: alias('model.ionoscloudConfig'),
    app: service(),
    init: function init() {
      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-ionoscloud/template'
      });
      set(this, 'layout', template);

      this._super.apply(this, arguments);
    },
    lans: [],
    actions: {
      save: function save() {
        this.set('config.natPublicIps', this.config.natPublicIps);
        this.set('config.nicIps', this.config.nicIps);
        this.config.natLansToGateways = this.lans.map(function (lan) {
          return "".concat(lan.id, "=").concat(lan.gatewayIps.join(','));
        }).join(':');
        this.set('config.natLansToGateways', this.config.natLansToGateways);

        this._super.apply(this, arguments);
      },
      reverseNatLansToGatewaysMap: function reverseNatLansToGatewaysMap() {
        var marshalledString = this.get('config.natLansToGateways');

        if (!marshalledString) {
          marshalledString = "";
        }

        var lans = marshalledString ? marshalledString.split(':').map(function (entry) {
          var _entry$split = entry.split('='),
              _entry$split2 = _slicedToArray(_entry$split, 2),
              id = _entry$split2[0],
              gatewayIps = _entry$split2[1];

          return {
            id: parseInt(id),
            gatewayIps: gatewayIps ? gatewayIps.split(',') : []
          };
        }) : [];
        this.set('lans', lans);
      },
      addGatewayIp: function addGatewayIp(lanId, gatewayIp) {
        if (validateIp(gatewayIp)) {
          var existingLan = this.lans.filter(function (lan) {
            return lan.id === lanId;
          })[0];

          if (existingLan === undefined) {
            this.lans.pushObject({
              id: lanId,
              gatewayIps: [gatewayIp]
            });
          } else {
            existingLan.gatewayIps.pushObject(gatewayIp);
          }

          this.send('updateNatLansToGatewaysMap');
        }
      },
      deleteGatewayIp: function deleteGatewayIp(lan, index) {
        lan.gatewayIps.removeAt(index);

        if (lan.gatewayIps.length === 0) {
          this.lans.removeObject(lan);
        }

        this.send('updateNatLansToGatewaysMap');
      },
      addPublicIp: function addPublicIp(newPublicIp) {
        if (validateIp(newPublicIp)) {
          this.config.natPublicIps.pushObject(newPublicIp);
          this.set("newPublicIp", "");
        }
      },
      deletePublicIp: function deletePublicIp(index) {
        this.config.natPublicIps.removeAt(index);
      },
      addNicIp: function addNicIp(newIp) {
        if (validateIp(newIp)) {
          this.config.nicIps.pushObject(newIp);
          this.set("newIp", "");
        }
      },
      deleteNicIp: function deleteNicIp(index) {
        this.config.nicIps.removeAt(index);
      }
    },
    bootstrap: function bootstrap() {
      var config = get(this, 'globalStore').createRecord({
        type: 'ionoscloudConfig',
        cores: 2,
        ram: 2048,
        userData: '',
        token: '',
        username: '',
        createNat: false,
        privateLan: false,
        sshInUserData: false,
        waitForIpChange: false,
        waitForIpChangeTimeout: 600,
        password: '',
        endpoint: 'https://api.ionos.com/cloudapi/v6',
        serverType: 'ENTERPRISE',
        natPublicIps: [],
        nicDhcp: false,
        nicIps: []
      });
      set(this, 'model.ionoscloudConfig', config);
    },
    validate: function validate() {
      this._super();

      var errors = get(this, 'errors') || [];

      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }

      if (parseInt(get(this, 'config.memorySize'), defaultRadix) < defaultBase) {
        errors.push('Memory Size must be at least 1024 MB');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    },
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);

      this.send('reverseNatLansToGatewaysMap');
    },
    zoneOptions: [{
      name: 'AUTO',
      value: 'AUTO'
    }, {
      name: 'ZONE_1',
      value: 'ZONE_1'
    }, {
      name: 'ZONE_2',
      value: 'ZONE_2'
    }, {
      name: 'ZONE_3',
      value: 'ZONE_3'
    }],
    locationOptions: [{
      name: 'Las Vegas, USA',
      value: 'us/las'
    }, {
      name: 'Newark, USA',
      value: 'us/ewr'
    }, {
      name: 'Frankfurt, Germany',
      value: 'de/fra'
    }, {
      name: 'Berlin, Germany',
      value: 'de/txl'
    }, {
      name: 'London, UK',
      value: 'gb/lhr'
    }, {
      name: 'Logroño, Spain',
      value: 'es/vit'
    }, {
      name: 'Paris, France',
      value: 'fr/par'
    }],
    serverTypeOptions: [{
      name: 'Enterprise',
      value: 'ENTERPRISE'
    }, {
      name: 'Cube',
      value: 'CUBE'
    }],
    cubeServerTemplateOptions: [{
      name: 'XS',
      value: 'CUBES XS'
    }, {
      name: 'S',
      value: 'CUBES S'
    }, {
      name: 'M',
      value: 'CUBES M'
    }, {
      name: 'L',
      value: 'CUBES L'
    }, {
      name: 'XL',
      value: 'CUBES XL'
    }, {
      name: 'XXL',
      value: 'CUBES XXL'
    }, {
      name: '3XL',
      value: 'CUBES 3XL'
    }, {
      name: '4XL',
      value: 'CUBES 4XL'
    }],
    cpuOptions: [{
      name: 'Intel SKYLAKE (Europe)',
      value: 'INTEL_SKYLAKE'
    }, {
      name: 'AMD OPTERON (USA)',
      value: 'AMD_OPTERON'
    }, {
      name: 'Intel XEON (USA)',
      value: 'INTEL_XEON'
    }],
    storageTypeOptions: [{
      name: 'HDD',
      value: 'HDD'
    }, {
      name: 'SSD',
      value: 'SSD'
    }]
  });

  function validateIp(ip) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
      return true;
    }

    alert("You have entered an invalid IP address!");
    return false;
  }
});;
"use strict";

define("ui/components/driver-ionoscloud/component", ["exports", "nodes/components/driver-ionoscloud/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
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

  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICAge3shLS0gVGhpcyBsaW5lIHNob3dzIHRoZSBkcml2ZXIgdGl0bGUgd2hpY2ggeW91IGRvbid0IGhhdmUgdG8gY2hhbmdlIGl0IC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgbWItMjAiPjxzcGFuPnt7ZHJpdmVyT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbSB0aXRsZT0iQWNjb3VudCBBY2Nlc3MiCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbD0iQVBJIGVuZHBvaW50IGFuZCBjcmVkZW50aWFscy4iCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZEFsbD1leHBhbmRBbGwKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZE9uSW5pdD10cnVlCiAgICB9fQogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlVzZXJuYW1lLiBGYWxsYmFjayB0byBUb2tlbiBpZiBub3Qgc2V0LjwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy51c2VybmFtZQogICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0iWW91ciBJT05PUyB1c2VybmFtZSIKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+UGFzc3dvcmQuIEZhbGxiYWNrIHRvIFRva2VuIGlmIG5vdCBzZXQuPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdHlwZT0icGFzc3dvcmQiCiAgICAgICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5wYXNzd29yZAogICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0iWW91ciBJT05PUyBwYXNzd29yZCIKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEyIj4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5BUEkgVG9rZW4gKE92ZXJyaWRlcyBVc2VybmFtZSAmIFBhc3N3b3JkKTwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InBhc3N3b3JkIgogICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnRva2VuCiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9IllvdXIgSU9OT1MgdG9rZW4iCiAgICAgICAgICB9fQogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPllvdSBjYW4gdXNlIDxhIGhyZWY9Imh0dHBzOi8vZG9jcy5pb25vcy5jb20vY2xpLWlvbm9zY3RsL3N1YmNvbW1hbmRzL2F1dGhlbnRpY2F0aW9uL3Rva2VuLWdlbmVyYXRlIiB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIj5pb25vc2N0bDwvYT4gdG8gZ2VuZXJhdGUgYW4gQVBJIHRva2VuLjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTIiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkFQSSBFbmRwb2ludDwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuZW5kcG9pbnQKICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0iaHR0cHM6Ly9hcGkuaW9ub3MuY29tL2Nsb3VkYXBpL3Y2IgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5PcHRpb25hbDwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KCiAgICB7eyNhY2NvcmRpb24tbGlzdC1pdGVtIHRpdGxlPSJJbnN0YW5jZSBPcHRpb25zIgogICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw9IlZNIHNldHRpbmdzLiBTZXQgdXAgeW91ciBjb3JlIGNvdW50ICYgcmFtLiIKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kQWxsPWV4cGFuZEFsbAogICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kT25Jbml0PWZhbHNlCiAgICB9fQogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkxvY2F0aW9uPC9sYWJlbD4KICAgICAgICAgICAge3tuZXctc2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PWxvY2F0aW9uT3B0aW9ucwogICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uTGFiZWxQYXRoPSduYW1lJwogICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uVmFsdWVQYXRoPSd2YWx1ZScKICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5sb2NhdGlvbgogICAgICAgICAgICB9fQogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlNlcnZlciBUeXBlPC9sYWJlbD4KICAgICAgICAgICAge3tuZXctc2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXNlcnZlclR5cGVPcHRpb25zCiAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25MYWJlbFBhdGg9J25hbWUnCiAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25WYWx1ZVBhdGg9J3ZhbHVlJwogICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnNlcnZlclR5cGUKICAgICAgICAgICAgfX0KICAgICAgICA8L2Rpdj4KICAgICAgICB7eyNpZiAoZXEgY29uZmlnLnNlcnZlclR5cGUgIkNVQkUiKSB9fQogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNVQkUgU2VydmVyIFRlbXBsYXRlPC9sYWJlbD4KICAgICAgICAgIHt7bmV3LXNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9Y3ViZVNlcnZlclRlbXBsYXRlT3B0aW9ucwogICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbkxhYmVsUGF0aD0nbmFtZScKICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25WYWx1ZVBhdGg9J3ZhbHVlJwogICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy50ZW1wbGF0ZQogICAgICAgICAgfX0KICAgICAgICA8L2Rpdj4KICAgICAgICB7e2Vsc2V9fQogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlNlcnZlciBab25lPC9sYWJlbD4KICAgICAgICAgIHt7bmV3LXNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9em9uZU9wdGlvbnMKICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25MYWJlbFBhdGg9J25hbWUnCiAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uVmFsdWVQYXRoPSd2YWx1ZScKICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuc2VydmVyWm9uZQogICAgICAgICAgfX0KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0zIj4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5Wb2x1bWUgWm9uZTwvbGFiZWw+CiAgICAgICAgICB7e25ldy1zZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXpvbmVPcHRpb25zCiAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uTGFiZWxQYXRoPSduYW1lJwogICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblZhbHVlUGF0aD0ndmFsdWUnCiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnZvbHVtZVpvbmUKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgICAge3svaWZ9fQogICAgICA8L2Rpdj4KCiAgICAgIHt7I2lmIChlcSBjb25maWcuc2VydmVyVHlwZSAiRU5URVJQUklTRSIpIH19CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMyI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Q1BVIEZhbWlseTwvbGFiZWw+CiAgICAgICAgICAgIHt7bmV3LXNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD1jcHVPcHRpb25zCiAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25MYWJlbFBhdGg9J25hbWUnCiAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25WYWx1ZVBhdGg9J3ZhbHVlJwogICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLmNwdUZhbWlseQogICAgICAgICAgICB9fQogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTMiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNQVSBjb3JlIGNvdW50PC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQtaW50ZWdlcgogICAgICAgICAgICB2YWx1ZT1jb25maWcuY29yZXMKICAgICAgICAgICAgcGxhY2Vob2xkZXI9NAogICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlJBTTwvbGFiZWw+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CiAgICAgICAgICAgIHt7aW5wdXQtaW50ZWdlciBtaW49MjU2CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcucmFtCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgIH19CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPk1pQjwvZGl2PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+TXVzdCBiZSBhIG11bHRpcGxlIG9mIDI1NjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+U3RvcmdlIFNpemU8L2xhYmVsPgogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAgICB7e2lucHV0LWludGVnZXIgdmFsdWU9Y29uZmlnLmRpc2tTaXplCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgIH19CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPkdCPC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5TdG9yYWdlIFR5cGU8L2xhYmVsPgogICAgICAgICAge3tuZXctc2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD1zdG9yYWdlVHlwZU9wdGlvbnMKICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25MYWJlbFBhdGg9J25hbWUnCiAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uVmFsdWVQYXRoPSd2YWx1ZScKICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuZGlza1R5cGUKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICB7e2Vsc2V9fQogICAgICB7ey9pZn19CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+SW1hZ2UgQWxpYXMgb3IgSUQ8L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IgogICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuaW1hZ2UKICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9InVidW50dToyMC4wNCIKICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5Zb3UgY2FuIHVzZSA8YSBocmVmPSJodHRwczovL2RvY3MuaW9ub3MuY29tL2NsaS1pb25vc2N0bCIgdGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9vcGVuZXIgbm9yZWZlcnJlciI+aW9ub3NjdGwgaW1hZ2UgbGlzdCBbLUYgbmFtZT1vcGVyYXRpbmdTeXN0ZW1dPC9hPjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JbWFnZSBQYXNzd29yZDwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InBhc3N3b3JkIgogICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuaW1hZ2VQYXNzd29yZAogICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0iYWJjZGUxMjM0NSIKICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5DYW4gYmUgdXNlZCB0byBjb25uZWN0IHRvIHRoZSBWTTwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTIiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNsb3VkIGluaXQgY29uZmlndXJhdGlvbi48L2xhYmVsPgogICAgICAgICAgPHRleHRhcmVhIGlkPSJlZGl0b3IiIHZhbHVlPXt7Y29uZmlnLmNsb3VkSW5pdH19IG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgY29uZmlnLmNsb3VkSW5pdCkgdmFsdWU9InRhcmdldC52YWx1ZSIgfX0gcm93cz0iMyIgc3R5bGU9IndpZHRoOiAxMDAlOyByZXNpemU6IHZlcnRpY2FsIj48L3RleHRhcmVhPgogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPk9wdGlvbmFsLiA8YSBocmVmPSJodHRwczovL2Nsb3VkaW5pdC5yZWFkdGhlZG9jcy5pby9lbi9sYXRlc3QvdG9waWNzL2V4YW1wbGVzLmh0bWwiIHRhcmdldD0iX2JsYW5rIiByZWw9Im5vb3BlbmVyIG5vcmVmZXJyZXIiPkNsb3VkLWluaXQgRG9jdW1lbnRhdGlvbjwvYT4uPC9wPgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQoKICAgIHt7I2FjY29yZGlvbi1saXN0LWl0ZW0gdGl0bGU9Ik5ldHdvcmsgT3B0aW9ucyIKICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsPSJTZXQgdXAgeW91ciB0YXJnZXQgRGF0YWNlbnRlciwgTEFOLCBhbmQgb3RoZXIgbmV0d29yayBzZXR0aW5ncyBoZXJlLiIKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kQWxsPWV4cGFuZEFsbAogICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kT25Jbml0PWZhbHNlCiAgICB9fQogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlNTSCBVc2VyPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnNzaFVzZXIKICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5PcHRpb25hbC4gVXNlciB0byBjb25uZWN0IHRvIHZpYSBTU0guPC9wPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPlNlbmQgU1NIIGluIHVzZXIgZGF0YS48L2xhYmVsPgogICAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1jaGVjayIgc3R5bGU9IiI+CiAgICAgICAgICAgIHt7aW5wdXQgdHlwZT0iY2hlY2tib3giCiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD1jb25maWcuc3NoSW5DbG91ZEluaXQKICAgICAgICAgICAgfX0KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNoZWNrLWxhYmVsIiBmb3I9InNzaEluQ2xvdWRJbml0Q2hlY2tib3giPgogICAgICAgICAgICAgIFNlbmQgU1NIIGluIHVzZXIgZGF0YS4KICAgICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlNob3VsZCB0aGUgZHJpdmVyIG9ubHkgYWRkIHRoZSBTU0ggaW5mbyBpbiB0aGUgdXNlciBkYXRhPyAocmVxdWlyZWQgZm9yIGN1c3RvbSBpbWFnZXMpLjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+IHt7IS0tIERhdGFjZW50ZXIgY29uZmlnIHJvdy0tfX0KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JT05PUyBEYXRhY2VudGVyIElEPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLmRhdGFjZW50ZXJJZAogICAgICAgICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPk9wdGlvbmFsLCBVVUlELTQgZm9ybWF0LiBJZiB5b3Ugd2FudCB0byB1c2UgYW4gZXhpc3RpbmcgSU9OT1MgRGF0YWNlbnRlciB0byBob3N0IHRoaXMgVk0sIHlvdSBjYW4gcHJvdmlkZSBpdHMgSUQgaGVyZS48L3A+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+SU9OT1MgRGF0YWNlbnRlciBOYW1lPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIKICAgICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLmRhdGFjZW50ZXJOYW1lCiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+U3RyaW5nLiBJZiB5b3Ugd2FudCB0byB1c2UgYW4gZXhpc3RpbmcgSU9OT1MgRGF0YWNlbnRlciB0byBob3N0IHRoaXMgVk0sIHlvdSBjYW4gY2hhbmdlIHRoZSBuYW1lIGhlcmUuIFBsZWFzZSBub3RlIHRoYXQgaWYgdGhlIElEIGlzIHNldCBpdCB3aWxsIHRoZSBwcmlvcml0aXplZC48L3A+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPiAge3shLS0gTEFOIGNvbmZpZyByb3ctLX19CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+SU9OT1MgTGFuIElEPC9sYWJlbD4KICAgICAgICAgIDwhLS0gVE9ETzogVGhpcywgaWYgaGFzIGlucHV0LCBzaG91bGQgbWFrZSBEYXRhY2VudGVySUQgYSByZXF1aXJlZCBpbnB1dCAtLT4KICAgICAgICAgIHt7aW5wdXQtaW50ZWdlcgogICAgICAgICAgICB2YWx1ZT1jb25maWcubGFuSWQKICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5PcHRpb25hbCwgaW50ZWdlci4gVGhlIExBTiB0aGUgVk0gd2lsbCBhdHRhY2ggdG8uIElmIGJsYW5rLCBhIGRlZmF1bHQgTEFOIHdpbGwgYmUgY3JlYXRlZC4gT3ZlcnJpZGVzICJQcml2YXRlIExBTiIgc2V0dGluZy48L3A+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+SU9OT1MgTGFuIE5hbWU8L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IgogICAgICAgICAgICAgICAgICB2YWx1ZT1jb25maWcubGFuTmFtZQogICAgICAgICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPlN0cmluZy4gSWYgeW91IHdhbnQgdG8gdXNlIGFuIGV4aXN0aW5nIElPTk9TIExBTiwgeW91IGNhbiBjaGFuZ2UgdGhlIG5hbWUgaGVyZS4gUGxlYXNlIG5vdGUgdGhhdCBpZiB0aGUgSUQgaXMgc2V0IGl0IHdpbGwgdGhlIHByaW9yaXRpemVkLjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5Qcml2YXRlIExBTjwvbGFiZWw+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJmb3JtLWNoZWNrIiBzdHlsZT0iIj4KICAgICAgICAgICAge3tpbnB1dCB0eXBlPSJjaGVja2JveCIKICAgICAgICAgICAgICAgICAgICBjaGVja2VkPWNvbmZpZy5wcml2YXRlTGFuCiAgICAgICAgICAgIH19CiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jaGVjay1sYWJlbCIgZm9yPSJwcml2YXRlTGFuQ2hlY2tib3giPgogICAgICAgICAgICAgIE1ha2UgRGVmYXVsdCBMQU4gUHJpdmF0ZQogICAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+SWYgdGhlIGRlZmF1bHQgTEFOIGRvZXMgbm90IGV4aXN0LCBjcmVhdGUgYSBwcml2YXRlIExBTjwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+ICB7eyEtLSBOSUMgY29uZmlnIHJvdy0tfX0KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JT05PUyBOSUMgREhDUDwvbGFiZWw+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJmb3JtLWNoZWNrIiBzdHlsZT0iIj4KICAgICAgICAgICAge3tpbnB1dCB0eXBlPSJjaGVja2JveCIKICAgICAgICAgICAgICAgICAgICBjaGVja2VkPWNvbmZpZy5uaWNEaGNwCiAgICAgICAgICAgIH19CiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jaGVjay1sYWJlbCIgZm9yPSJuaWNEaGNwQ2hlY2tib3giPgogICAgICAgICAgICAgIE5JQyBESENQCiAgICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5TZXQgd2hldGhlciB0aGUgY3JlYXRlZCBOSUMgc2hvdWxkIGhhdmUgZGhjcCBzZXQgb24gb3Igb2ZmPC9wPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYgZm9ybS1ncm91cCI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+TklDIElQczwvbGFiZWw+PGJyLz4KCiAgICAgICAgICB7eyNlYWNoIGNvbmZpZy5uaWNJcHMgYXMgfElwIGluZGV4fH19CiAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgICB7e2lucHV0IGlkPShjb25jYXQgIklwLSIgaW5kZXgpIHZhbHVlPUlwIHBsYWNlaG9sZGVyPSJJUCIgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIG1iLTIgYXV0b3dpZHRoIGNvbCIgcmVhZG9ubHk9dHJ1ZX19CiAgICAgICAgICAgIDxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRuIGJ0bi1vdXRsaW5lLWRhbmdlciBidG4tc20gY29sIHNwYW4tMiIge3thY3Rpb24gImRlbGV0ZU5pY0lwIiBpbmRleH19Pi08L2J1dHRvbj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgICB7e2lucHV0IGlkPSJuZXdJcCIgdmFsdWU9KG11dCBuZXdJcCkgcGxhY2Vob2xkZXI9Ik5ldyBJUCIgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIG1iLTIgYXV0b3dpZHRoIGNvbCJ9fQogICAgICAgICAgICA8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0biBidG4tb3V0bGluZS1kYW5nZXIgYnRuLXNtIGNvbCBzcGFuLTIiIHt7YWN0aW9uICJhZGROaWNJcCIgbmV3SXB9fT4rPC9idXR0b24+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5PcHRpb25hbC4gSVBCbG9jayByZXNlcnZlZCBJUHMuIElmIG5vdCBzZXQsIHRoZSBkcml2ZXIgd2lsbCByZXNlcnZlIGFuIElQQmxvY2sgYXV0b21hdGljYWxseSBvciBsZXQgdGhlIEFQSSBzZXQgYSBwcml2YXRlIElQIGlmIHRoZSBMQU4gaXMgcHJpdmF0ZTwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+V2FpdCBmb3IgTklDIElQIGNoYW5nZTwvbGFiZWw+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJmb3JtLWNoZWNrIiBzdHlsZT0iIj4KICAgICAgICAgICAge3tpbnB1dCB0eXBlPSJjaGVja2JveCIKICAgICAgICAgICAgICAgICAgICBjaGVja2VkPWNvbmZpZy53YWl0Rm9ySXBDaGFuZ2UKICAgICAgICAgICAgfX0KICAgICAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNoZWNrLWxhYmVsIiBmb3I9IndhaXRGb3JJcENoYW5nZUNoZWNrYm94Ij4KICAgICAgICAgICAgICBXYWl0IGZvciBOSUMgSVAgY2hhbmdlCiAgICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5TaG91bGQgdGhlIGRyaXZlciB3YWl0IGZvciB0aGUgTklDIElQIHRvIGJlIHNldCBieSBleHRlcm5hbCBzb3VyY2VzPzwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5XYWl0IGZvciBJUCBjaGFuZ2UgdGltZW91dDwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0LWludGVnZXIKICAgICAgICAgICAgdmFsdWU9Y29uZmlnLndhaXRGb3JJcENoYW5nZVRpbWVvdXQKICAgICAgICAgICAgcGxhY2Vob2xkZXI9NjAwCiAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPiB7eyEtLSBOQVQgY29uZmlnIHJvdy0tfX0KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi00Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5JT05PUyBOYXQgR2F0ZXdheSBJRDwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5uYXRJZAogICAgICAgICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICB9fQogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPk9wdGlvbmFsLCBVVUlELTQgZm9ybWF0LiBVc2UgYSBwcmVjb25maWd1cmVkIE5BVCBHYXRld2F5LiBEYXRhY2VudGVyIElEIGFuZCBQcml2YXRlIExBTiByZXF1aXJlZC4gT3ZlcnJpZGVzIE5BVCBDb25maWcgYmVsb3c8L3A+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNCI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+SU9OT1MgTmF0IEdhdGV3YXkgTmFtZTwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiCiAgICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5uYXROYW1lCiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+U3RyaW5nLiBJZiB0aGUgIkNyZWF0ZSBOQVQiIGNoZWNrYm94IGlzIGNoZWNrZWQsIHdpbGwgdHJ5IGNyZWF0aW5nIGEgTkFUIHdpdGggdGhpcyBuYW1lLiBJZiBvbmUgYWxyZWFkeSBleGlzdHMsIHdpbGwgdXNlIHRoZSBleGlzdGluZyBOQVQuPC9wPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTQiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNyZWF0ZSBhIGNvbmZpZ3VyYWJsZSBOQVQ8L2xhYmVsPgogICAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1jaGVjayIgc3R5bGU9IiI+CiAgICAgICAgICAgIHt7aW5wdXQgdHlwZT0iY2hlY2tib3giCiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD1jb25maWcuY3JlYXRlTmF0CiAgICAgICAgICAgIH19CiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jaGVjay1sYWJlbCIgZm9yPSJjcmVhdGVOYXRDaGVja2JveCI+CiAgICAgICAgICAgICAgQ3JlYXRlIE5BVAogICAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+UmVxdWlyZXMgcHJpdmF0ZSBMQU4uIFlvdSBjYW4gb3ZlcnJpZGUgc2V0dGluZ3Mgb2YgdGhpcyBOQVQgdXNpbmcgdGhlIGZvcm0gYmVsb3cgPGEgaHJlZj0iIyIgdGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9vcGVuZXIgbm9yZWZlcnJlciI+U2VlIG9wZW4gcG9ydHMgaGVyZTwvYT4uIE11c3Qgc2V0IGdhdGV3YXkgSVAgYXMgZGVmYXVsdCByb3V0ZSB2aWEgY2xvdWQgY29uZmlnLCBkZWZhdWx0OiAxMC4wLjAuMTwvcD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDwhLS0gQ3VzdG9tIE5BVCBHYXRld2F5IHNldHRpbmdzICAtLT4KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02IGZvcm0tZ3JvdXAiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5DdXN0b20gTkFUOiBtYXAgTEFOcyB0byBHYXRld2F5IElQczwvbGFiZWw+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgICAgIHt7aW5wdXQgdmFsdWU9bmV3TGFuSWQgcGxhY2Vob2xkZXI9IkxhbiBJRCIgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIG1iLTIgY29sIHNwYW4tNSBhdXRvd2lkdGgifX0KICAgICAgICAgICAgICB7e2lucHV0IHZhbHVlPWdhdGV3YXlJcCBwbGFjZWhvbGRlcj0iR2F0ZXdheSBJUCIgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIG1iLTIgY29sIHNwYW4tNSBhdXRvd2lkdGgifX0KICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0biBidG4tcHJpbWFyeSBidG4tc20gY29sIHNwYW4tMiIge3thY3Rpb24gImFkZEdhdGV3YXlJcCIgbmV3TGFuSWQgZ2F0ZXdheUlwfX0+QWRkPC9idXR0b24+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICB7eyNlYWNoIGxhbnMgYXMgfGxhbnx9fQogICAgICAgICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+TGFuIHt7bGFuLmlkfX0gR2F0ZXdheSBJUHM8L2xhYmVsPjxici8+CiAgICAgICAgICAgICAgICB7eyNlYWNoIGxhbi5nYXRld2F5SXBzIGFzIHxnYXRld2F5SXAgaW5kZXh8fX0KICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICAgICAgICAgICAgICB7e2lucHV0IGlkPShjb25jYXQgImdhdGV3YXlJcC0iIGxhbi5pZCAiLSIgaW5kZXgpIHZhbHVlPShtdXQgZ2F0ZXdheUlwKSBwbGFjZWhvbGRlcj0iR2F0ZXdheSBJUCIgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIGNvbCBzcGFuLTExIGF1dG93aWR0aCIgcmVhZG9ubHk9dHJ1ZX19CiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG4gYnRuLW91dGxpbmUtZGFuZ2VyIGJ0bi1zbSBjb2wgc3Bhbi0xIiB7e2FjdGlvbiAiZGVsZXRlR2F0ZXdheUlwIiBsYW4gaW5kZXh9fT4tPC9idXR0b24+CiAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAge3svZWFjaH19CiAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+T3B0aW9uYWwuIE1hcHMgTGFuIElEcyB0byBhIHNwZWNpZmljIEdhdGV3YXkgSVAuIEdhdGV3YXkgSVAgbXVzdCBiZSBzZXQgbWFudWFsbHkgYXMgZGVmYXVsdCByb3V0ZS48L3A+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiBmb3JtLWdyb3VwIj4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5DdXN0b20gTkFUOiBQdWJsaWMgSVBzPC9sYWJlbD48YnIvPgoKICAgICAgICAgIHt7I2VhY2ggY29uZmlnLm5hdFB1YmxpY0lwcyBhcyB8cHVibGljSXAgaW5kZXh8fX0KICAgICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICAgIHt7aW5wdXQgaWQ9KGNvbmNhdCAicHVibGljSXAtIiBpbmRleCkgdmFsdWU9cHVibGljSXAgcGxhY2Vob2xkZXI9IlB1YmxpYyBJUCIgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIG1iLTIgYXV0b3dpZHRoIGNvbCIgcmVhZG9ubHk9dHJ1ZX19CiAgICAgICAgICAgIDxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRuIGJ0bi1vdXRsaW5lLWRhbmdlciBidG4tc20gY29sIHNwYW4tMiIge3thY3Rpb24gImRlbGV0ZVB1YmxpY0lwIiBpbmRleH19Pi08L2J1dHRvbj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgICB7e2lucHV0IGlkPSJuZXdQdWJsaWNJcCIgdmFsdWU9KG11dCBuZXdQdWJsaWNJcCkgcGxhY2Vob2xkZXI9Ik5ldyBQdWJsaWMgSVAiIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCBtYi0yIGF1dG93aWR0aCBjb2wifX0KICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG4gYnRuLW91dGxpbmUtZGFuZ2VyIGJ0bi1zbSBjb2wgc3Bhbi0yIiB7e2FjdGlvbiAiYWRkUHVibGljSXAiIG5ld1B1YmxpY0lwfX0+KzwvYnV0dG9uPgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+T3B0aW9uYWwuIElQQmxvY2sgcmVzZXJ2ZWQgSVBzLiBJZiBub3Qgc2V0LCB0aGUgZHJpdmVyIHdpbGwgcmVzZXJ2ZSBhbiBJUEJsb2NrIGF1dG9tYXRpY2FsbHk8L3A+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAge3svYWNjb3JkaW9uLWxpc3QtaXRlbX19CgogICAge3shLS0gVGhpcyBmb2xsb3dpbmcgY29udGFpbnMgdGhlIE5hbWUsIExhYmVscyBhbmQgRW5naW5lIE9wdGlvbnMgZmllbGRzIC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIiPjxzcGFuPnt7dGVtcGxhdGVPcHRpb25zVGl0bGV9fTwvc3Bhbj48L2Rpdj4KCiAgICB7e2Zvcm0tbmFtZS1kZXNjcmlwdGlvbgogICAgICBtb2RlbD1tb2RlbAogICAgICBuYW1lUmVxdWlyZWQ9dHJ1ZQogICAgfX0KCiAgICB7e2Zvcm0tdXNlci1sYWJlbHMKICAgICAgaW5pdGlhbExhYmVscz1sYWJlbFJlc291cmNlLmxhYmVscwogICAgICBzZXRMYWJlbHM9KGFjdGlvbiAnc2V0TGFiZWxzJykKICAgICAgZXhwYW5kQWxsPWV4cGFuZEFsbAogICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CgogICAge3tmb3JtLWVuZ2luZS1vcHRzCiAgICAgIG1hY2hpbmU9bW9kZWwKICAgICAgc2hvd0VuZ2luZVVybD1zaG93RW5naW5lVXJsCiAgICB9fQogIHt7L2FjY29yZGlvbi1saXN0fX0KCiAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgZXJyb3JzIHByb2R1Y2VkIGJ5IHZhbGlkYXRlKCkgaW4gdGhlIGNvbXBvbmVudCAtLX19CiAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQoKICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyB0aGUgQ3JlYXRlIGFuZCBDYW5jZWwgYnV0dG9ucyAtLX19CiAge3tzYXZlLWNhbmNlbAogICAgc2F2ZT0oYWN0aW9uICJzYXZlIikKICAgIGNhbmNlbD0oYWN0aW9uICJjYW5jZWwiKQogICAgZWRpdGluZz1lZGl0aW5nCiAgfX0KPC9zZWN0aW9uPg==";
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
        cloudInit: '',
        token: '',
        username: '',
        createNat: false,
        privateLan: false,
        sshInCloudInit: false,
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
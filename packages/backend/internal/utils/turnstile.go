package utils

import (
	"encoding/json"
	"net/http"
	"net/url"
)

const turnstileVerifyURL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

type TurnstileResponse struct {
	Success     bool     `json:"success"`
	ChallengeTs string   `json:"challenge_ts"`
	Hostname    string   `json:"hostname"`
	ErrorCodes  []string `json:"error-codes"`
}

func VerifyTurnstile(secret, token, remoteIP string) (bool, error) {
	resp, err := http.PostForm(turnstileVerifyURL, url.Values{
		"secret":   {secret},
		"response": {token},
		"remoteip": {remoteIP}, // optional
	})
	if err != nil {
		return false, err
	}
	defer resp.Body.Close()

	var tsResp TurnstileResponse
	if err := json.NewDecoder(resp.Body).Decode(&tsResp); err != nil {
		return false, err
	}
	return tsResp.Success, nil
}
